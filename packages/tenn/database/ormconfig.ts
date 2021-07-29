import * as path from 'path';

import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { password, port, username, host, database } from '../config';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...
// Check typeORM documentation for more information.
const config: ConnectionOptions & { seeds?: any } = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [
    path.join(__dirname, '../**/*.entity{.ts,.js}'),
    'node_modules/**/*.entity.js',
  ],
  seeds: [path.join(__dirname, '/seeds/*.seed{.ts,.js}')],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [__dirname + '../migrations/**/*{.ts,.js}'],

  cli: {
    migrationsDir: 'src/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
