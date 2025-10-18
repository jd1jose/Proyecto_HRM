import dotenv from 'dotenv';
dotenv.config();

export const env = {
  node: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES ?? '1d'
  }
};
