import { Sequelize } from 'sequelize';
import { env } from './env.js';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.pass, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: env.node === 'development' ? console.log : false,
  define: { underscored: true, freezeTableName: true }
});

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});