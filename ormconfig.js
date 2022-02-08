module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
  entities: ['./src/infra/database/typeorm/entities/**/*.ts'],
  cli: {
    migrationsDir: './src/infra/database/typeorm/migrations',
  },
};
