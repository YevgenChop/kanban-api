export default () => ({
  type: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.PORT) || 3000,
  db_port: parseInt(process.env.DB_PORT) || 5432,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  synchronize: process.env.DB_SYNCRONIZE === 'true',
  jwt_secret: process.env.JWT_SECRET,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  sendgrid_from: process.env.SENDGRID_FROM,
});
