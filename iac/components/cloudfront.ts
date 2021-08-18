import {
  ComponentResource,
  ComponentResourceOptions,
  Input,
} from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
interface CloudFrontArgs {
  bucket: aws.s3.Bucket;
  alias: Input<string>;
  certificateArn: any;
  dnsRootDomain: string;
  dnsRecord: string;
}

export class CloudFront extends ComponentResource {
  public readonly distribution: aws.cloudfront.Distribution;

  public constructor(
    name: string,
    args: CloudFrontArgs,
    opts?: ComponentResourceOptions
  ) {
    super("next:Cloudfront", name, args, opts);

    const s3OriginId = "next-bucket";

    const oai = new aws.cloudfront.OriginAccessIdentity("next-oai", {
      comment: "OAI for Next Bucket",
    });

    /**
     * Cloudfront Distribution
     */
    this.distribution = new aws.cloudfront.Distribution(
      "next-cloudfront-distribution",
      {
        origins: [
          {
            domainName: args.bucket.bucketRegionalDomainName,
            originId: s3OriginId,
            s3OriginConfig: {
              originAccessIdentity: oai.cloudfrontAccessIdentityPath,
            },
          },
        ],
        enabled: true,
        isIpv6Enabled: true,
        comment: "CloudFront distribution for Project Next",
        aliases: [args.alias],
        defaultCacheBehavior: {
          allowedMethods: ["GET", "HEAD", "OPTIONS"],
          cachedMethods: ["GET", "HEAD", "OPTIONS"],
          targetOriginId: s3OriginId,
          forwardedValues: {
            queryString: false,
            cookies: {
              forward: "none",
            },
          },
          viewerProtocolPolicy: "redirect-to-https",
          minTtl: 0,
          defaultTtl: 3600,
          maxTtl: 86400,
          // trustedKeyGroups: [keyGroup.id],
        },
        priceClass: "PriceClass_100",
        restrictions: {
          geoRestriction: {
            restrictionType: "none",
          },
        },
        tags: {
          Environment: "production",
        },

        viewerCertificate: {
          acmCertificateArn:
            "arn:aws:acm:us-east-1:136601095405:certificate/67f751ad-e17f-45cb-a925-0f2abb034461",
          sslSupportMethod: "sni-only",
        },
        retainOnDelete: true,
      }
    );

    /**
     * Get Hosted Zone ID
     */
    const hostedZoneId = aws.route53
      .getZone({ name: args.dnsRootDomain }, { async: true })
      .then((zone) => zone.zoneId);

    /**
     * Create Route53 Alias
     */
    const routeRecord = new aws.route53.Record("fms-cloudfront-alias", {
      name: args.dnsRecord,
      zoneId: hostedZoneId,
      type: "A",
      aliases: [
        {
          name: this.distribution.domainName,
          zoneId: this.distribution.hostedZoneId,
          evaluateTargetHealth: true,
        },
      ],
    });
  }
}
