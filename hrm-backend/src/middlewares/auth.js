import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import dotenv from 'dotenv';
dotenv.config();

export const requireAuth = (roles = []) => {
  // roles puede ser string o array
  const allowed = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;
      if (!token) return res.status(401).json({ message: 'Token requerido' });

      const payload = jwt.verify(token, env.jwt.secret);
      req.user = payload; // { id, role }
      if (allowed.length && !allowed.includes(payload.role)) {
        return res.status(403).json({ message: 'No autorizado' });
      }
      next();
    } catch {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };
};
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
