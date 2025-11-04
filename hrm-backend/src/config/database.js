import { Sequelize } from "sequelize";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

// 🔹 Conexión con Sequelize (ORM)
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para Render
    },
  },
  logging: true, // cambia a true si quieres ver logs de SQL
  define: { underscored: true, freezeTableName: true },
});

// 🔹 Conexión directa al pool de PostgreSQL (si usas consultas nativas)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});
