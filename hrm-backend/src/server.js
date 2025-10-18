import app from './app.js';
import { sequelize } from './models/index.js';
import { env } from './config/env.js';
import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
  try {
    await sequelize.authenticate();
    const syncOptions = env.node === 'development' ? { alter: true } : {};
    await sequelize.sync(syncOptions); // agrega columnas faltantes en dev (user_type, etc.)
    app.listen(env.port, () => {
      console.log(`✅ HRM API escuchando en http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('No se pudo iniciar el servidor:', err);
    process.exit(1);
  }
};

start();
