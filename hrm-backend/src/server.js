import app from './app.js';
import { sequelize } from './models/index.js';
import { env } from './config/env.js';
import dotenv from 'dotenv';
dotenv.config();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // cambia a { alter: true } en desarrollo si deseas
    app.listen(env.port, () => {
      console.log(`➡️  HRM API escuchando en http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('No se pudo iniciar el servidor:', err);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend corriendo en puerto ${PORT}`));

start();
