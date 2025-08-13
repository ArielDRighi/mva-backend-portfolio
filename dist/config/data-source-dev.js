"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.DevDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: ['error', 'warn', 'migration'],
});
//# sourceMappingURL=data-source-dev.js.map