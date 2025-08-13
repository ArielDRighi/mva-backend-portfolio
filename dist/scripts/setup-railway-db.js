"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
dotenv.config();
async function setupRailwayDatabase() {
    console.log('Iniciando configuración de base de datos en Railway...');
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'railway',
        schema: process.env.DB_SCHEMA,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        logging: true,
    });
    try {
        await dataSource.initialize();
        console.log('✅ Conexión a Railway establecida correctamente');
        console.log('✅ Estructura de base de datos sincronizada');
        const tables = (await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = '${process.env.DB_SCHEMA || 'public'}'
      ORDER BY table_name;
    `));
        console.log('📋 Tablas creadas:');
        tables.forEach((table) => {
            console.log(`  - ${table.table_name}`);
        });
        await dataSource.destroy();
        console.log('✅ Base de datos configurada correctamente en Railway');
    }
    catch (error) {
        console.error('❌ Error configurando la base de datos:', error);
        throw error;
    }
}
setupRailwayDatabase()
    .then(() => {
    console.log('🚀 Configuración completada exitosamente');
    process.exit(0);
})
    .catch((err) => {
    console.error('💥 Error inesperado:', err);
    process.exit(1);
});
//# sourceMappingURL=setup-railway-db.js.map