import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { Config } from "@pulumi/pulumi";
import { CloudFront } from "./components/cloudfront";

const config = new Config();

const options = {
  bucketName: config.require("bucketName"),
  vpcId: config.require("vpcId"),
  publicSubnetIds: config.require("publicSubnetIds").split(","),
  dbInstanceType: config.require("dbInstanceType"),
  dbAllocatedStorage: config.requireNumber("dbAllocatedStorage"),
  dbName: config.requireSecret("dbName"),
  dbUsername: config.requireSecret("dbUsername"),
  dbPassword: config.requireSecret("dbPassword"),
  awsKey: config.requireSecret("awsKey"),
  awsSecret: config.requireSecret("awsSecret"),
  ePassword: config.requireSecret("ePassword"),
  dnsRecord: config.require("dnsRecord"),
  dnsRootDomain: config.require("dnsRootDomain"),
};

const amazonIssued = pulumi.output(
  aws.acm.getCertificate({
    domain: "*.badha.io",
    mostRecent: true,
    types: ["AMAZON_ISSUED"],
  })
);

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("s3-bucket", {
  bucket: options.bucketName,
});

const cloudfront = new CloudFront("next-cloudfront", {
  bucket: bucket,
  alias: `${options.dnsRecord}.${options.dnsRootDomain}`,
  dnsRootDomain: options.dnsRootDomain,
  dnsRecord: options.dnsRecord,
  certificateArn: pulumi.interpolate`${amazonIssued.arn}`,
});

const vpc = awsx.ec2.Vpc.fromExistingIds("vpc", {
  vpcId: options.vpcId,
  publicSubnetIds: options.publicSubnetIds,
});

//  Security Group for traffic to/from alb
const albSecurityGroup = new awsx.ec2.SecurityGroup("web-alb-security-group", {
  vpc,
  ingress: [
    {
      // change this to 443
      fromPort: 1,
      toPort: 65535,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
      description: "Allow inbound all",
    },
  ],
  egress: [
    {
      fromPort: 1,
      toPort: 65535,
      protocol: "all",
      cidrBlocks: ["0.0.0.0/0"],
      description: "Allow outbound all",
    },
  ],

  tags: { Name: "web-alb" },
});

// Create security group for traffic to/from  ECS cluster
const clusterSecurityGroup = new awsx.ec2.SecurityGroup(
  "web-ecs-security-group",
  {
    vpc,
    ingress: [
      {
        sourceSecurityGroupId: albSecurityGroup.id,
        fromPort: 1,
        toPort: 65535,
        protocol: "tcp",
      },
    ],
    egress: [
      {
        cidrBlocks: ["0.0.0.0/0"],
        fromPort: 1,
        toPort: 65535,
        protocol: "all",
      },
    ],

    tags: { Name: "web-ecs" },
  }
);

/**
 * Database
 */

const securityGroup = new awsx.ec2.SecurityGroup(`postgress-security-group`, {
  vpc,

  ingress: [
    {
      // change this to 443
      fromPort: 1,
      toPort: 65535,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
      description: "Allow inbound all",
    },
    // {
    //   sourceSecurityGroupId: clusterSecurityGroup.id,
    //   fromPort: 5432,
    //   toPort: 5432,
    //   protocol: "tcp",
    // },
  ],

  egress: [
    {
      sourceSecurityGroupId: clusterSecurityGroup.id,
      fromPort: 1,
      toPort: 65535,
      protocol: "all",
    },
  ],
});

// Prepare RDS DB subnet groups in the VPC public subnets
const subnetGroup = new aws.rds.SubnetGroup("postgress-subnet-group", {
  subnetIds: vpc.publicSubnetIds,
});
const rds = new aws.rds.Instance('postgress-next-instance"', {
  engine: "postgres",
  engineVersion: "13.3",
  // Set instance class and storage
  instanceClass: options.dbInstanceType,
  allocatedStorage: options.dbAllocatedStorage,

  // Set database name
  name: options.dbName,
  identifier: "postgress-next",

  // Set access credentials
  username: options.dbUsername,
  password: options.dbPassword,

  dbSubnetGroupName: subnetGroup.id,
  vpcSecurityGroupIds: [securityGroup.id],

  multiAz: false,
  backupWindow: "00:00-01:00",
  maintenanceWindow: "Fri:01:15-Fri:05:15",
  backupRetentionPeriod: 7,
  applyImmediately: true,
  skipFinalSnapshot: true,
  autoMinorVersionUpgrade: true,
  performanceInsightsEnabled: true,
  enabledCloudwatchLogsExports: ["postgresql"],
  publiclyAccessible: true,
});
// EOF Database

// Create an ECS Fargate cluster.
const cluster = new awsx.ecs.Cluster("next-internal", {
  name: "next-internal-cluster",
  vpc,
  securityGroups: [clusterSecurityGroup.id],

  // Attach tags
  tags: { Name: "Web ECS Cluster" },
});

const serviceAccount = aws.elb.getServiceAccount();

const elbLogs = new aws.s3.Bucket("elbLogs", {
  bucket: "next-web-access-logs",
  acl: "private",
  policy: serviceAccount.then(
    (serviceAccount) => `{
  "Id": "Policy",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::next-web-access-logs/AWSLogs/*",
      "Principal": {
        "AWS": [
          "${serviceAccount.arn}"
        ]
      }
    }
  ]
}
`
  ),
});

// // Create an ECS Fargate cluster.
// const webCluster = new awsx.ecs.Cluster("next-frontend", {
//   name: "next-frontend",
//   vpc,
//   securityGroups: [clusterSecurityGroup.id],

//   // Attach tags
//   tags: { Name: "Frontent ECS Cluster" },
// });

const alb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer("web-lb", {
  name: "web-alb",
  subnets: vpc.publicSubnetIds,
  securityGroups: [albSecurityGroup.id],
  accessLogs: {
    bucket: elbLogs.bucket,
    enabled: true,
  },
  idleTimeout: 300,
  tags: {
    Name: "web-alb",
  },
});

const apiTargetGroup = alb.createTargetGroup("api-target-group", {
  protocol: "HTTP",
  port: 8000,

  slowStart: 30,

  // stickiness: {
  //   type: "lb_cookie",
  // },

  healthCheck: {
    path: "/",
    protocol: "HTTP",
    port: "8000",
    matcher: "200,302",
    // timeout: 5,
    // healthyThreshold: 3,
    // unhealthyThreshold: 5,
    // interval: 15,
  },
});
const badhaTargetGroup = alb.createTargetGroup("badha-target-group", {
  protocol: "HTTP",
  port: 3000,

  slowStart: 30,

  // stickiness: {
  //   type: "lb_cookie",
  // },

  healthCheck: {
    path: "/",
    protocol: "HTTP",
    port: "3000",
    matcher: "200,302",
    // timeout: 5,
    // healthyThreshold: 3,
    // unhealthyThreshold: 5,
    // interval: 15,
  },
});

// const webTargetGroup = alb.createTargetGroup("web-target-group", {
//   protocol: "HTTP",
//   port: 3000,

//   slowStart: 30,

//   // stickiness: {
//   //   type: "lb_cookie",
//   // },

//   healthCheck: {
//     path: "/",
//     protocol: "HTTP",
//     port: "3000",
//     matcher: "200,302",
//     // timeout: 5,
//     // healthyThreshold: 3,
//     // unhealthyThreshold: 5,
//     // interval: 15,
//   },
// });

const web = alb.createListener("badha-listner", {
  port: 443,
  protocol: "HTTPS",
  certificateArn: amazonIssued.arn,
  sslPolicy: "ELBSecurityPolicy-2016-08",
  targetGroup: badhaTargetGroup,
});

const apiRoute = web.addListenerRule("api-route", {
  priority: 100,
  actions: [
    {
      type: "forward",
      targetGroupArn: apiTargetGroup.targetGroup.arn,
    },
  ],
  conditions: [
    {
      hostHeader: {
        values: ["api.badha.io"],
      },
    },
  ],
});

// const webRoute = web.addListenerRule("web-route", {
//   priority: 50,
//   actions: [
//     // {
//     //   type: "authenticate-cognito",
//     //   authenticateCognito: {
//     //     userPoolArn: pool.arn,
//     //     userPoolClientId: client.id,
//     //     userPoolDomain: domain.domain,
//     //   },
//     // },
//     {
//       type: "forward",
//       targetGroupArn: webTargetGroup.targetGroup.arn,
//     },
//   ],
//   conditions: [
//     {
//       hostHeader: {
//         values: ["b4u7UwW4w-KcJjXL2wk.badha.io"],
//       },
//     },
//   ],
// });

// const imageProxyTargetGroup = alb.createTargetGroup("image-proxy-target-group", {
//   protocol: "HTTP",
//   port: 3000,

//   slowStart: 30,

//   // stickiness: {
//   //   type: "lb_cookie",
//   // },

//   healthCheck: {
//     path: "/",
//     protocol: "HTTP",
//     port: "3000",
//     matcher: "200,302",
//     // timeout: 5,
//     // healthyThreshold: 3,
//     // unhealthyThreshold: 5,
//     // interval: 15,
//   },
// });

// const web = alb.createListener("badha-listner", {
//   port: 443,
//   protocol: "HTTPS",
//   certificateArn: amazonIssued.arn,
//   sslPolicy: "ELBSecurityPolicy-2016-08",
//   targetGroup: badhaTargetGroup,
// });

// const imgProxyRoute = web.addListenerRule("imgproxy-route", {
//   priority: 60,
//   actions: [
//     {
//       type: "forward",
//       targetGroupArn: webTargetGroup.targetGroup.arn,
//     },
//   ],
//   conditions: [
//     {
//       hostHeader: {
//         values: ["b4u7UwW4w-KcJjXL2wk.badha.io"],
//       },
//     },
//   ],
// });

// const apiRoute = new aws.lb.ListenerRule("static", {
//   listenerArn: web.arn,

// });
// Create Application Load balancer in the VPC
// const alb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer("alb", {

// });

// const web = alb.createListener("http-listner-http", {
//   port: 443,
//   protocol: "HTTPS",
//   external: false,
//   certificateArn: amazonIssued.arn,
//   sslPolicy: "ELBSecurityPolicy-2016-08",

//   targetGroup: {
//     protocol: "HTTP",
//     port: 8000,

//     slowStart: 30,

//     // stickiness: {
//     //   type: "lb_cookie",
//     // },

//     healthCheck: {
//       path: "/",
//       protocol: "HTTP",
//       port: "8000",
//       matcher: "200,302",
//       // timeout: 5,
//       // healthyThreshold: 3,
//       // unhealthyThreshold: 5,
//       // interval: 15,
//     },
//   },
// });

/**
 * FARGATE SERVICE FOR API
 */

// const namespace = new aws.servicediscovery.PrivateDnsNamespace(
//   "private-dns-namespace",
//   {
//     name: "next-ecs",
//     vpc: vpc.id,
//   }
// );

// DNS for ECS Services
// const serviceDns = new aws.servicediscovery.Service("next-service-discovery", {
//   dnsConfig: {
//     namespaceId: namespace.id,
//     dnsRecords: [
//       {
//         ttl: 10,
//         type: "A",
//       },
//     ],
//   },
//   healthCheckCustomConfig: {
//     failureThreshold: 1,
//   },
// });

const apiRepo = new awsx.ecr.Repository("next/api");

const api = new awsx.ecs.FargateService("next-api-service", {
  name: "next-api",
  cluster,
  // forceNewDeployment: true,
  subnets: vpc.publicSubnetIds,

  taskDefinitionArgs: {
    container: {
      image: apiRepo.buildAndPushImage({
        context: "../packages/api",
        target: "production",
        cacheFrom: true,
        // cacheFrom: { stages: ["development"] },
        extraOptions: ["--quiet", "--load"],
        args: { BUILDKIT_INLINE_CACHE: "1" },
      }),
      portMappings: [apiTargetGroup],
      cpu: 1024,
      memory: 2048,
      environment: [
        {
          name: "DATABASE_URL",
          value: pulumi.interpolate`postgres://${options.dbUsername}:${options.ePassword}@${rds.endpoint}/${options.dbName}?schema=public`,
        },
        {
          name: "S3_BUCKET",
          value: options.bucketName,
        },
        {
          name: "AWS_KEY",
          value: options.awsKey,
        },
        {
          name: "AWS_SECRET",
          value: options.awsSecret,
        },
        {
          name: "CDN_URL",
          value: pulumi.interpolate`https://${bucket.bucketDomainName}`,
        },
        {
          name: "PORT",
          value: "8000",
        },
        {
          name: "CATEGORY_ID",
          value: "1",
        },
      ],
    },
  },
  desiredCount: 1,

  healthCheckGracePeriodSeconds: 30,
});

const badhRepo = new awsx.ecr.Repository("next/badha");

// const badhaImage = awsx.ecs.Image.fromPath("next/badha", "../packages/badha");
const badha = new awsx.ecs.FargateService("next-badha-service", {
  // waitForSteadyState: false,
  name: "next-badha",
  cluster,
  subnets: vpc.publicSubnetIds,
  // serviceRegistries: {
  //   containerName: "container",
  //   registryArn: serviceDns.arn,
  // },
  // forceNewDeployment: true,
  taskDefinitionArgs: {
    container: {
      image: badhRepo.buildAndPushImage({
        context: "../packages/badha",
        target: "runner",
        cacheFrom: true,

        // cacheFrom: { stages: ["deps", "build"] },
        // extraOptions: ["--quiet", "--load"],
        args: { BUILDKIT_INLINE_CACHE: "1" },
      }),
      // image: badhaImage,
      portMappings: [badhaTargetGroup],
      cpu: 1024,
      memory: 2048,
      // environment: [
      //   {
      //     name: "API_HOST",
      //     value: pulumi.interpolate`${serviceDns.name}.${namespace.name}`,
      //   },
      // ],
    },
  },
  desiredCount: 1,
  healthCheckGracePeriodSeconds: 30,
});

// WEBSITE

// const webRepo = new awsx.ecr.Repository("next/web");

// const website = new awsx.ecs.FargateService("next-web-service", {
//   name: "next-web",
//   cluster,
//   subnets: vpc.publicSubnetIds,

//   taskDefinitionArgs: {
//     containers: {
//       web: {
//         image: webRepo.buildAndPushImage({
//           context: "../packages/web",
//           target: "runner",
//           cacheFrom: true,
//           // cacheFrom: { stages: ["deps", "build"] },
//           // extraOptions: ["--quiet", "--load"],
//           args: { BUILDKIT_INLINE_CACHE: "1" },
//         }),
//         portMappings: [webTargetGroup],
//         cpu: 1024,
//         memory: 2048,
//         environment: [
//           {
//             name: "CDN_URL",
//             value: pulumi.interpolate`https://${bucket.bucketDomainName}`,
//           },
//         ],
//       },
//     },
//   },
//   desiredCount: 1,
//   healthCheckGracePeriodSeconds: 30,
// });

// const imgproxy = new awsx.ecs.FargateService("next-imgproxy-service", {
//   name: "next-web",
//   cluster,
//   subnets: vpc.publicSubnetIds,

//   taskDefinitionArgs: {
//     containers: {
//       web: {
//         image: "darthsim/imgproxy",
//         portMappings: [webTargetGroup],
//         cpu: 1024,
//         memory: 2048,
//         environment: [
//           {
//             name: "CDN_URL",
//             value: pulumi.interpolate`https://${bucket.bucketDomainName}`,
//           },
//         ],
//       },
//     },
//   },
// });

// Export the name of the bucket
export const bucketName = bucket.id;
export const url = web.endpoint.hostname;
export const db = rds.endpoint;
