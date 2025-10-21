import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import vacanciesRoutes from './routes/vacancies.routes.js';
import postulantesRoutes from './routes/postulantes.routes.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

// Evitar cache en endpoints de API y desactivar ETag (previene 304)
app.set('etag', false);
app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vacancies', vacanciesRoutes);
app.use('/api/postulantes', postulantesRoutes);

// Manejo de 404
app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

// Manejo de errores centralizado
app.use(errorHandler);

export default app;

