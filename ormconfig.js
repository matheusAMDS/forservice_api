const nodeEnv = process.env.NODE_ENV
const dir = nodeEnv === 'production' ? 'build' : 'src'
const ext = nodeEnv === 'production' ? 'js' : 'ts'

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  /* host: process.env.DB_HOST,
  post: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, */
  synchronize: false,
  entities: [`${dir}/app/models/**/*.${ext}`],
  migrations: [`${dir}/database/migrations/**/*.${ext}`],
  cli: {
    entitiesDir: `src/app/models`,
    migrationsDir: `src/database/migrations`
  }
}