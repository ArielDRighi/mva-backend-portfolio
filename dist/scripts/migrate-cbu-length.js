"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateCbuLength = migrateCbuLength;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function migrateCbuLength() {
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'mva_db',
        synchronize: false,
        logging: true,
    });
    try {
        await dataSource.initialize();
        console.log('📊 Conexión a la base de datos establecida');
        console.log('🔄 Iniciando migración para actualizar longitud del campo CBU...');
        await dataSource.query(`
      ALTER TABLE employees 
      ALTER COLUMN "CBU" TYPE VARCHAR(22);
    `);
        console.log('✅ Campo CBU actualizado a 22 caracteres');
        const result = await dataSource.query(`
      SELECT character_maximum_length 
      FROM information_schema.columns 
      WHERE table_name = 'employees' 
      AND column_name = 'CBU';
    `);
        if (result[0]?.character_maximum_length === 22) {
            console.log('✅ Verificación exitosa: El campo CBU ahora acepta 22 caracteres');
        }
        else {
            console.log('❌ Error en la verificación. Longitud actual:', result[0]?.character_maximum_length);
        }
    }
    catch (error) {
        console.error('❌ Error durante la migración:', error);
        throw error;
    }
    finally {
        await dataSource.destroy();
        console.log('🔐 Conexión cerrada');
    }
}
if (require.main === module) {
    migrateCbuLength()
        .then(() => {
        console.log('🎉 Migración completada exitosamente');
        process.exit(0);
    })
        .catch((error) => {
        console.error('💥 Error en la migración:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=migrate-cbu-length.js.map