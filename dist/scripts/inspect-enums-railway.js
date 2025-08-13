"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
dotenv.config();
async function inspectEnumsRailway() {
    console.log('🔍 Inspeccionando valores de enums en Railway...');
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
        const enums = await dataSource.query(`
      SELECT 
        t.typname as enum_name,
        e.enumlabel as enum_value
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid
      WHERE t.typname LIKE '%enum%'
      ORDER BY t.typname, e.enumsortorder;
    `);
        console.log('\n🎯 VALORES DE ENUMS ENCONTRADOS:');
        console.log('================================');
        const enumGroups = {};
        enums.forEach((row) => {
            if (!enumGroups[row.enum_name]) {
                enumGroups[row.enum_name] = [];
            }
            enumGroups[row.enum_name].push(row.enum_value);
        });
        Object.keys(enumGroups).forEach((enumName) => {
            console.log(`\n📋 ${enumName}:`);
            enumGroups[enumName].forEach((value) => {
                console.log(`  - ${value}`);
            });
        });
        await dataSource.destroy();
        console.log('\n🔌 Conexión cerrada');
    }
    catch (error) {
        console.error('❌ Error durante la inspección:', error);
        throw error;
    }
}
inspectEnumsRailway()
    .then(() => {
    console.log('✅ Inspección de enums completada');
    process.exit(0);
})
    .catch((err) => {
    console.error('💥 Error:', err);
    process.exit(1);
});
//# sourceMappingURL=inspect-enums-railway.js.map