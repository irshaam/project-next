"use strict";
var path = require("path");
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
var config_1 = require("../config");
// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...
// Check typeORM documentation for more information.
var config = {
    type: 'postgres',
    host: config_1.host,
    port: config_1.port,
    username: config_1.username,
    password: config_1.password,
    database: config_1.database,
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
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
        migrationsDir: 'src/migrations'
    },
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
};
module.exports = config;
