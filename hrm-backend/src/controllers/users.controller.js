import Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { ok, created } from '../utils/responses.js';

const baseSchema = Joi.object({
  full_name: Joi.string().min(3).max(150),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(64),
  role: Joi.string().valid('admin','reclutador','tecnico','cliente'),
  active: Joi.boolean()
});

export const listUsers = async (req, res, next) => {
  try {
    const { page = 1, size = 10, q = '' } = req.query;
    const offset = (page - 1) * size;
    const where = q ? { email: q } : undefined;
    const data = await User.findAndCountAll({ where, limit: +size, offset, order: [['id','DESC']] });
    return ok(res, { items: data.rows, total: data.count, page: +page, size: +size });
  } catch (err) { next(err); }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'No encontrado' });
    return ok(res, user);
  } catch (err) { next(err); }
};

export const createUser = async (req, res, next) => {
  try {
    const { value, error } = baseSchema.requiredKeys('full_name','email','password').validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    value.password = await bcrypt.hash(value.password, 12);
    const user = await User.create(value);
    return created(res, user);
  } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
  try {
    const { value, error } = baseSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'No encontrado' });

    if (value.password) value.password = await bcrypt.hash(value.password, 12);
    await user.update(value);
    return ok(res, user);
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'No encontrado' });
    await user.destroy();
    return ok(res, { id: req.params.id }, 'Eliminado');
  } catch (err) { next(err); }
};
