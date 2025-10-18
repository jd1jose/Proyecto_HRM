import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { User } from '../models/index.js';
import { env } from '../config/env.js';
import { created, ok } from '../utils/responses.js';
import { pool } from '../config/database.js';

const registerSchema = Joi.object({
  full_name: Joi.string().min(3).max(150).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
  role: Joi.string().valid('admin','reclutador','tecnico','cliente').default('reclutador')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const exists = await User.findOne({ where: { email: value.email } });
    if (exists) return res.status(409).json({ message: 'El correo ya está registrado' });

    const hash = await bcrypt.hash(value.password, 12);
    const user = await User.create({ ...value, password: hash });
    return created(res, user);
  } catch (err) { next(err); }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(password)
    console.log(user.password)
    if (password !== user.password)
    return res.status(401).json({ message: 'Contraseña incorrecta' });
    /*if (!validPassword)
      return res.status(401).json({ message: 'Contraseña incorrecta' });*/

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
