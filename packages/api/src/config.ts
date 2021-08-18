import * as dotenv from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

// load .env
dotenv.config();

// sanitize env variables
const env = cleanEnv(process.env, {
  CATEGORY_ID: num({ default: 1 }),
  AWS_KEY: str(),
  AWS_SECRET: str(),
  S3_BUCKET: str(),
  CDN_URL: str(),
  PORT: num(),
});

// export
export const {
  CATEGORY_ID: categoryId,
  AWS_KEY: aws_key,
  AWS_SECRET: aws_secret,
  S3_BUCKET: s3_bucket,
  CDN_URL: cdn_url,
  PORT: app_port,
} = env;
