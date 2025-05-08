import pkg from "pg";
import path from "path";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config({ path: path.resolve('src', '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Accept AWS RDS self-signed certs
    }
});

pool.on("connect", () => {
    console.log("Connection pool established with Database");
});

export default pool;