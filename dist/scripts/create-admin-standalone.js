"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
dotenv.config();
async function createAdminUser() {
    console.log('Iniciando proceso de creación de usuario administrador...');
    let dataSource;
    if (process.env.DATABASE_URL) {
        dataSource = new typeorm_1.DataSource({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['dist/**/*.entity.js'],
            synchronize: false,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        console.log('Usando DATABASE_URL para conexión a Railway');
    }
    else {
        dataSource = new typeorm_1.DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_DATABASE || 'mva_db',
            schema: process.env.DB_SCHEMA,
            entities: ['dist/**/*.entity.js'],
            synchronize: false,
        });
        console.log('Usando variables individuales para conexión local');
    }
    try {
        await dataSource.initialize();
        console.log('Conexión a la base de datos establecida correctamente');
        const checkAdminQuery = `SELECT * FROM users WHERE nombre = 'admin' OR email = 'test@ar.com'`;
        const existingAdmin = await dataSource.query(checkAdminQuery);
        if (existingAdmin && existingAdmin.length > 0) {
            console.log('¡Usuario administrador ya existe!');
            console.log(`Nombre: ${existingAdmin[0].nombre}`);
            console.log(`Email: ${existingAdmin[0].email}`);
            return;
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash('Test1234', saltRounds);
        const insertAdminQuery = `
      INSERT INTO users (nombre, email, password_hash, estado, roles, empleado_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING usuario_id, nombre, email, estado
    `;
        const result = await dataSource.query(insertAdminQuery, [
            'admin',
            'test@ar.com',
            passwordHash,
            'ACTIVO',
            '{ADMIN}',
            null,
        ]);
        const adminUser = result[0];
        console.log('¡Usuario administrador creado exitosamente!');
        console.log('-------------------------------------');
        console.log('Email: test@ar.com (usar para iniciar sesión)');
        console.log('Password: Test1234');
        console.log('Nombre: admin');
        console.log('Roles: ADMIN');
        console.log('ID:', adminUser.usuario_id);
        console.log('-------------------------------------');
        console.log('¡IMPORTANTE! Usa el EMAIL para iniciar sesión, no el nombre de usuario.');
        console.log('Recuerda cambiar esta contraseña después del primer inicio de sesión.');
    }
    catch (error) {
        console.error('Error al crear el usuario administrador:', error);
        throw error;
    }
    finally {
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('Conexión a la base de datos cerrada');
        }
    }
}
createAdminUser()
    .then(() => {
    console.log('Script finalizado correctamente');
    process.exit(0);
})
    .catch((err) => {
    console.error('Error inesperado al ejecutar el script:', err);
    process.exit(1);
});
//# sourceMappingURL=create-admin-standalone.js.map