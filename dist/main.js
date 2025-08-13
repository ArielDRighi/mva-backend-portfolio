"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/config/dist");
const fs = require("fs");
const path = require("path");
async function bootstrap() {
    let httpsOptions = undefined;
    if (process.env.NODE_ENV === 'production' &&
        process.env.SSL_CERT_PATH &&
        process.env.SSL_KEY_PATH) {
        try {
            httpsOptions = {
                key: fs.readFileSync(path.resolve(process.env.SSL_KEY_PATH)),
                cert: fs.readFileSync(path.resolve(process.env.SSL_CERT_PATH)),
            };
            console.log('SSL certificates loaded successfully');
        }
        catch (error) {
            console.error('Error loading SSL certificates:', error);
            console.log('Falling back to HTTP mode');
        }
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, httpsOptions ? { httpsOptions } : {});
    const configService = app.get(dist_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                process.env.FRONTEND_URL,
                'http://localhost:3000',
                'http://localhost:3001',
                'http://145.79.1.115:3001',
                'https://145.79.1.115:3001',
                'https://mvasrl.com'
            ].filter(Boolean);
            if (!origin)
                return callback(null, true);
            console.log('Origin recibido:', origin);
            console.log('Orígenes permitidos:', allowedOrigins);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            else {
                return callback(new Error('No permitido por CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    const protocol = httpsOptions ? 'https' : 'http';
    console.log(`Application running on port ${port}`);
    console.log(`API available at ${protocol}://localhost:${port}/api`);
}
bootstrap().catch((err) => {
    console.error('Error during bootstrap:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map