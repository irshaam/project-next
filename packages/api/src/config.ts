import * as dotenv from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

// load .env
dotenv.config();

// sanitize env variables
const env = cleanEnv(process.env, {
  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: num(),
  DB_DATABASE: str({ default: 'project_next' }),
  DB_USERNAME: str({ default: 'project_next' }),
  DB_PASSWORD: str({ default: 'project_next' }),
  CATEGORY_ID: num({ default: 1 }),
  AWS_KEY: str(),
  AWS_SECRET: str(),
  S3_BUCKET: str(),
  CDN_URL: str(),
  PORT: num(),
});

// export
export const {
  DB_HOST: host,
  DB_PORT: port,
  DB_DATABASE: database,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  CATEGORY_ID: categoryId,
  AWS_KEY: aws_key,
  AWS_SECRET: aws_secret,
  S3_BUCKET: s3_bucket,
  CDN_URL: cdn_url,
  PORT: app_port,
} = env;
