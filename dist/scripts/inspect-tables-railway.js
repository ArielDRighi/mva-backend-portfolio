"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
dotenv.config();
async function inspectTablesRailway() {
    console.log('🔍 Inspeccionando estructura de tablas en Railway...');
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL no está configurada');
    }
    const dataSource = new typeorm_1.DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    try {
        await dataSource.initialize();
        console.log('✅ Conexión a Railway establecida');
        const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
        console.log('\n📋 TABLAS ENCONTRADAS:');
        console.log('======================');
        tables.forEach((table) => {
            console.log(`- ${table.table_name}`);
        });
        const tablesToInspect = [
            'vehicles',
            'clients',
            'chemical_toilets',
            'employees',
            'users',
        ];
        for (const tableName of tablesToInspect) {
            try {
                const columns = await dataSource.query(`
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = '${tableName}' 
          AND table_schema = 'public'
          ORDER BY ordinal_position;
        `);
                if (columns.length > 0) {
                    console.log(`\n🔧 ESTRUCTURA DE ${tableName.toUpperCase()}:`);
                    console.log('================================');
                    columns.forEach((col) => {
                        console.log(`  ${col.column_name} | ${col.data_type} | ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
                    });
                }
                else {
                    console.log(`\n❌ Tabla '${tableName}' no encontrada`);
                }
            }
            catch (error) {
                console.log(`\n❌ Error inspeccionando tabla '${tableName}':`, error.message);
            }
        }
        await dataSource.destroy();
        console.log('\n🔌 Conexión cerrada');
    }
    catch (error) {
        console.error('❌ Error durante la inspección:', error);
        throw error;
    }
}
inspectTablesRailway()
    .then(() => {
    console.log('✅ Inspección completada');
    process.exit(0);
})
    .catch((err) => {
    console.error('💥 Error:', err);
    process.exit(1);
});
//# sourceMappingURL=inspect-tables-railway.js.map