"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    if (process.env.DATABASE_URL) {
        const config = {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
            logging: ['error', 'warn', 'info', 'log', 'schema'],
            dropSchema: false,
            ssl: {
                rejectUnauthorized: false,
            },
            timezone: 'local',
            extra: {
                parseInputDatesAsUTC: false,
                writeDatesAsUTC: false,
            },
        };
        console.log('=== CONFIGURACIÓN TYPEORM (Railway/URL) ===');
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('Using DATABASE_URL connection');
        console.log('synchronize:', config.synchronize);
        console.log('entities:', config.entities);
        console.log('===============================');
        return config;
    }
    throw new Error('No database configuration found. Please set DATABASE_URL or individual DB variables.');
});
//# sourceMappingURL=database.config.js.map