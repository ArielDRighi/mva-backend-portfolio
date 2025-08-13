import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

// Interfaz para resultados de COUNT
interface CountResult {
  count: string;
}

/**
 * Script para precargar datos de ejemplo en Railway PostgreSQL
 * Incluye vehículos, clientes, sanitarios y empleados
 */
async function preloadDataRailway() {
  console.log('🚀 Iniciando precarga de datos de ejemplo en Railway...');

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL no está configurada. Asegúrate de tener la URL de Railway en tu .env',
    );
  }

  // Crear una conexión directa a Railway
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
    await dataSource.initialize();
    console.log('✅ Conexión a Railway establecida correctamente');

    // 1. Verificar que existan usuarios
    const users: unknown[] = await dataSource.query(
      'SELECT * FROM users LIMIT 1',
    );
    if (!users || users.length === 0) {
      console.error(
        '❌ No se encontraron usuarios. Ejecuta primero: npm run seed:admin:railway',
      );
      return;
    }

    console.log('👥 Usuarios encontrados, continuando con la precarga...');

    // 2. Crear datos de vehículos
    console.log('🚗 Creando vehículos de ejemplo...');
    const vehicleQueries = [
      `INSERT INTO vehicles (placa, marca, modelo, año, estado, tipo_cabina, es_externo) 
       VALUES ('ABC123', 'Ford', 'Transit', 2020, 'DISPONIBLE', 'simple', false) 
       ON CONFLICT (placa) DO NOTHING`,
      `INSERT INTO vehicles (placa, marca, modelo, año, estado, tipo_cabina, es_externo) 
       VALUES ('DEF456', 'Mercedes', 'Sprinter', 2021, 'DISPONIBLE', 'doble', false) 
       ON CONFLICT (placa) DO NOTHING`,
      `INSERT INTO vehicles (placa, marca, modelo, año, estado, tipo_cabina, es_externo) 
       VALUES ('GHI789', 'Iveco', 'Daily', 2019, 'MANTENIMIENTO', 'simple', false) 
       ON CONFLICT (placa) DO NOTHING`,
    ];

    for (const query of vehicleQueries) {
      await dataSource.query(query);
    }
    console.log('✅ Vehículos creados');

    // 3. Crear datos de clientes
    console.log('🏢 Creando clientes de ejemplo...');
    const clientQueries = [
      `INSERT INTO clients (nombre_empresa, cuit, telefono, email, direccion, contacto_principal, fecha_registro, estado) 
       VALUES ('Empresa Demo S.A.', '20-12345678-9', '011-4444-5555', 'demo@empresa.com', 'Av. Corrientes 1234, CABA', 'Juan Pérez', NOW(), 'ACTIVO') 
       ON CONFLICT (cuit) DO NOTHING`,
      `INSERT INTO clients (nombre_empresa, cuit, telefono, email, direccion, contacto_principal, fecha_registro, estado) 
       VALUES ('Constructora ABC', '30-87654321-2', '011-5555-6666', 'info@constructoraabc.com', 'San Martín 567, San Isidro', 'María González', NOW(), 'ACTIVO') 
       ON CONFLICT (cuit) DO NOTHING`,
      `INSERT INTO clients (nombre_empresa, cuit, telefono, email, direccion, contacto_principal, fecha_registro, estado) 
       VALUES ('Eventos Premium', '27-11223344-5', '011-6666-7777', 'eventos@premium.com', 'Libertador 890, Vicente López', 'Carlos Silva', NOW(), 'ACTIVO') 
       ON CONFLICT (cuit) DO NOTHING`,
    ];

    for (const query of clientQueries) {
      await dataSource.query(query);
    }
    console.log('✅ Clientes creados');

    // 4. Crear sanitarios químicos
    console.log('🚽 Creando sanitarios químicos de ejemplo...');
    const toiletQueries = [
      `INSERT INTO chemical_toilets (codigo_interno, modelo, fecha_adquisicion, estado) 
       VALUES ('S001', 'Premium EcoLoo', NOW(), 'DISPONIBLE') 
       ON CONFLICT (codigo_interno) DO NOTHING`,
      `INSERT INTO chemical_toilets (codigo_interno, modelo, fecha_adquisicion, estado) 
       VALUES ('S002', 'Standard EcoLoo', NOW(), 'DISPONIBLE') 
       ON CONFLICT (codigo_interno) DO NOTHING`,
      `INSERT INTO chemical_toilets (codigo_interno, modelo, fecha_adquisicion, estado) 
       VALUES ('S003', 'Deluxe PortaLoo', NOW(), 'ASIGNADO') 
       ON CONFLICT (codigo_interno) DO NOTHING`,
      `INSERT INTO chemical_toilets (codigo_interno, modelo, fecha_adquisicion, estado) 
       VALUES ('S004', 'Standard PortaLoo', NOW(), 'MANTENIMIENTO') 
       ON CONFLICT (codigo_interno) DO NOTHING`,
      `INSERT INTO chemical_toilets (codigo_interno, modelo, fecha_adquisicion, estado) 
       VALUES ('S005', 'Premium EcoLoo', NOW(), 'RESERVADO') 
       ON CONFLICT (codigo_interno) DO NOTHING`,
    ];

    for (const query of toiletQueries) {
      await dataSource.query(query);
    }
    console.log('✅ Sanitarios químicos creados');

    // 5. Crear empleados de ejemplo
    console.log('👷 Creando empleados de ejemplo...');
    const employeeQueries = [
      `INSERT INTO employees (nombre, apellido, documento, telefono, email, direccion, fecha_contratacion, cargo, estado) 
       VALUES ('Juan', 'Pérez', '12345678', '011-1111-2222', 'juan.perez@mva.com', 'Rivadavia 123', '2023-01-10', 'Operario', 'ACTIVO') 
       ON CONFLICT (documento) DO NOTHING`,
      `INSERT INTO employees (nombre, apellido, documento, telefono, email, direccion, fecha_contratacion, cargo, estado) 
       VALUES ('María', 'González', '87654321', '011-3333-4444', 'maria.gonzalez@mva.com', 'Belgrano 456', '2023-02-15', 'Supervisora', 'ACTIVO') 
       ON CONFLICT (documento) DO NOTHING`,
      `INSERT INTO employees (nombre, apellido, documento, telefono, email, direccion, fecha_contratacion, cargo, estado) 
       VALUES ('Carlos', 'Rodríguez', '11223344', '011-5555-6666', 'carlos.rodriguez@mva.com', 'Mitre 789', '2023-03-20', 'Chofer', 'ACTIVO') 
       ON CONFLICT (documento) DO NOTHING`,
    ];

    for (const query of employeeQueries) {
      await dataSource.query(query);
    }
    console.log('✅ Empleados creados');

    // 6. Mostrar resumen
    const vehicleCount: CountResult[] = await dataSource.query(
      'SELECT COUNT(*) as count FROM vehicles',
    );
    const clientCount: CountResult[] = await dataSource.query(
      'SELECT COUNT(*) as count FROM clients',
    );
    const toiletCount: CountResult[] = await dataSource.query(
      'SELECT COUNT(*) as count FROM chemical_toilets',
    );
    const employeeCount: CountResult[] = await dataSource.query(
      'SELECT COUNT(*) as count FROM employees',
    );
    const userCount: CountResult[] = await dataSource.query(
      'SELECT COUNT(*) as count FROM users',
    );

    console.log('\n📊 RESUMEN DE DATOS CREADOS:');
    console.log('============================');
    console.log(`👥 Usuarios: ${userCount[0].count}`);
    console.log(`👷 Empleados: ${employeeCount[0].count}`);
    console.log(`🏢 Clientes: ${clientCount[0].count}`);
    console.log(`🚗 Vehículos: ${vehicleCount[0].count}`);
    console.log(`🚽 Sanitarios: ${toiletCount[0].count}`);
    console.log('============================');

    await dataSource.destroy();
    console.log('🔌 Conexión a Railway cerrada');
  } catch (error: unknown) {
    console.error('❌ Error durante la precarga de datos:', error);
    throw error;
  }
}

// Ejecutar el script
preloadDataRailway()
  .then(() => {
    console.log('✅ Precarga de datos completada exitosamente');
    process.exit(0);
  })
  .catch((err: unknown) => {
    console.error('💥 Error inesperado:', err);
    process.exit(1);
  });
