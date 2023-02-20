module.exports = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "client-card",
    entities: ["src/**/*.model.ts"],
    logging: true,
    synchronize: true,
}
