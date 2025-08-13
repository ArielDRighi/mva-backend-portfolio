import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  // Si tienes DATABASE_URL, úsala directamente (Railway/Heroku)
  if (process.env.DATABASE_URL) {
    const config = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: ['error', 'warn', 'info', 'log', 'schema'],
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false, // Para Railway/Heroku
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

  // Fallback a variables individuales (para desarrollo local)
  // Descomenta estas líneas y comenta DATABASE_URL para usar DB local
  // const config = {
  //   type: 'postgres',
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT || '5432', 10),
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_DATABASE,
  //   schema: process.env.DB_SCHEMA,
  //   entities: ['dist/**/*.entity.js'],
  //   synchronize: true,
  //   logging: ['error', 'warn', 'info', 'log', 'schema'],
  //   dropSchema: false,
  //
  //   // Usar configuración local para evitar conversiones automáticas
  //   timezone: 'local',
  //   extra: {
  //     // Deshabilitar conversiones automáticas para conservar fechas exactas
  //     parseInputDatesAsUTC: false,
  //     writeDatesAsUTC: false,
  //   },
  // };
  //
  // console.log('=== CONFIGURACIÓN TYPEORM (Local/Variables) ===');
  // console.log('NODE_ENV:', process.env.NODE_ENV);
  // console.log('host:', config.host);
  // console.log('database:', config.database);
  // console.log('synchronize:', config.synchronize);
  // console.log('entities:', config.entities);
  // console.log('===============================');
  //
  // return config;

  throw new Error(
    'No database configuration found. Please set DATABASE_URL or individual DB variables.',
  );
});
