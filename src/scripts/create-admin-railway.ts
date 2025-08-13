import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

/**
 * Script para crear un usuario administrador en Railway PostgreSQL
 */
async function createAdminUserRailway() {
  console.log(
    'Iniciando proceso de creación de usuario administrador en Railway...',
  );

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL no está configurada. Asegúrate de tener la URL de Railway en tu .env',
    );
  }

  // Crear una conexión directa a Railway usando DATABASE_URL
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Inicializar la conexión
    await dataSource.initialize();
    console.log('✅ Conexión a Railway establecida correctamente');

    // Verificar si el usuario admin ya existe
    const checkAdminQuery = `SELECT * FROM users WHERE nombre = 'admin' OR email = 'test@ar.com'`;
    const existingAdmin: Array<{ nombre: string; email: string }> =
      await dataSource.query(checkAdminQuery);

    if (existingAdmin && existingAdmin.length > 0) {
      console.log('⚠️  Usuario administrador ya existe!');
      console.log(`Nombre: ${existingAdmin[0].nombre}`);
      console.log(`Email: ${existingAdmin[0].email}`);
      return;
    }

    // Crear el hash de la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('Test1234', saltRounds);

    // Insertar el usuario admin directamente con SQL
    const insertAdminQuery = `
      INSERT INTO users (nombre, email, password_hash, estado, roles, empleado_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING usuario_id, nombre, email, estado
    `;

    interface AdminUser {
      usuario_id: string;
      nombre: string;
      email: string;
      estado: string;
    }

    const result = await dataSource.query<AdminUser[]>(insertAdminQuery, [
      'admin',
      'test@ar.com',
      passwordHash,
      'ACTIVO',
      '{ADMIN}',
      null,
    ]);

    const adminUser = result[0];
    console.log('🎉 ¡Usuario administrador creado exitosamente en Railway!');
    console.log('=====================================================');
    console.log('📧 Email: test@ar.com (usar para iniciar sesión)');
    console.log('🔑 Password: Test1234');
    console.log('👤 Nombre: admin');
    console.log('🔐 Roles: ADMIN');
    console.log('🆔 ID:', adminUser.usuario_id);
    console.log('=====================================================');
    console.log('⚠️  IMPORTANTE:');
    console.log(
      '   - Usa el EMAIL para iniciar sesión, no el nombre de usuario',
    );
    console.log(
      '   - Cambia esta contraseña después del primer inicio de sesión',
    );
    console.log('   - Este usuario tiene permisos completos de administrador');
  } catch (error) {
    console.error('❌ Error al crear el usuario administrador:', error);
    throw error;
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Conexión a Railway cerrada');
    }
  }
}

// Ejecutar el script
createAdminUserRailway()
  .then(() => {
    console.log('✅ Script finalizado correctamente');
    process.exit(0);
  })
  .catch((err) => {
    console.error('💥 Error inesperado al ejecutar el script:', err);
    process.exit(1);
  });
