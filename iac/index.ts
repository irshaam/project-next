import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { Config } from "@pulumi/pulumi";

const config = new Config();

const options = {
  bucketName: config.require("bucketName"),
  vpcId: config.require("vpcId"),
  publicSubnetIds: config.require("publicSubnetIds").split(","),
};

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("s3-bucket", {
  bucket: options.bucketName,
});

const vpc = awsx.ec2.Vpc.fromExistingIds("vpc", {
  vpcId: options.vpcId,
  publicSubnetIds: options.publicSubnetIds,
});

// const dnsNamespace = new aws.servicediscovery.PrivateDnsNamespace(
//   "private-dns-namespace",
//   {
//     name: "next-ecs",
//     vpc: vpc.id,
//   }
// );

// // DNS for ECS Services
// const apiDns = new aws.servicediscovery.Service("search-svc-discovery", {
//   dnsConfig: {
//     namespaceId: dnsNamespace.id,
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

// Create an ECS Fargate cluster.
const cluster = new awsx.ecs.Cluster("cluster", {
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

// Create Application Load balancer in the VPC
const alb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer("alb", {
  name: "web-alb",
  vpc,
  subnets: vpc.publicSubnetIds,
  securityGroups: [albSecurityGroup.id],

  idleTimeout: 300,

  accessLogs: {
    bucket: elbLogs.bucket,
    enabled: true,
  },

  tags: {
    Name: "web-alb",
  },
});

const amazonIssued = pulumi.output(
  aws.acm.getCertificate({
    domain: "*.badha.io",
    mostRecent: true,
    types: ["AMAZON_ISSUED"],
  })
);

const api = alb.createListener("api-listner-http", {
  port: 443,
  protocol: "HTTPS",
  external: false,
  certificateArn: amazonIssued.arn,
  sslPolicy: "ELBSecurityPolicy-2016-08",

  targetGroup: {
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
  },
});

/**
 * FARGATE SERVICE FOR API
 */
const apiImage = awsx.ecs.Image.fromPath("next/api", "../packages/api");
// const badhaImage = awsx.ecs.Image.fromPath("next/badha", "../packages/badha");

const web = new awsx.ecs.FargateService("next-api-service", {
  name: "next-api-cluster",
  cluster,
  subnets: vpc.publicSubnetIds,
  taskDefinitionArgs: {
    containers: {
      api: {
        image: apiImage,
        portMappings: [api],
        cpu: 1024,
        memory: 2048,
      },

      // web: {
      //   image: badhaImage,
      //   portMappings: [api],
      //   cpu: 1024,
      //   memory: 2048,
      //   environment: [
      //     {
      //       name: "API_HOST",
      //       value: pulumi.interpolate`${apiDns.name}.${dnsNamespace.name}`,
      //     },
      //   ],
      // },
    },
  },
  desiredCount: 1,
  healthCheckGracePeriodSeconds: 30,
});

// Export the name of the bucket
export const bucketName = bucket.id;
export const url = api.endpoint.hostname;
