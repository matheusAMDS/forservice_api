module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  post: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ["src/app/models/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  cli: {
    entitiesDir: "src/app/models",
    migrationsDir: "src/database/migrations"
  }
}