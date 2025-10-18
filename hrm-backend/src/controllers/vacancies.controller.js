import Joi from 'joi';
import { Vacancy } from '../models/index.js';
import { ok, created } from '../utils/responses.js';

const schema = Joi.object({
  title: Joi.string().min(3).max(200),
  department: Joi.string().max(120).allow(null, ''),
  location: Joi.string().max(120).allow(null, ''),
  description: Joi.string().allow(null, ''),
  status: Joi.string().valid('abierta','cerrada','en_proceso')
});

export const listVacancies = async (req, res, next) => {
  try {
    const { page = 1, size = 10, status } = req.query;
    const offset = (page - 1) * size;
    const where = status ? { status } : undefined;
    const data = await Vacancy.findAndCountAll({ where, limit: +size, offset, order: [['id','DESC']] });
    return ok(res, { items: data.rows, total: data.count, page: +page, size: +size });
  } catch (err) { next(err); }
};

export const getVacancy = async (req, res, next) => {
  try {
    const vac = await Vacancy.findByPk(req.params.id);
    if (!vac) return res.status(404).json({ message: 'No encontrado' });
    return ok(res, vac);
  } catch (err) { next(err); }
};

export const createVacancy = async (req, res, next) => {
  try {
    const { value, error } = schema.requiredKeys('title').validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const vac = await Vacancy.create(value);
    return created(res, vac);
  } catch (err) { next(err); }
};

export const updateVacancy = async (req, res, next) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const vac = await Vacancy.findByPk(req.params.id);
    if (!vac) return res.status(404).json({ message: 'No encontrado' });
    await vac.update(value);
    return ok(res, vac);
  } catch (err) { next(err); }
};

export const deleteVacancy = async (req, res, next) => {
  try {
    const vac = await Vacancy.findByPk(req.params.id);
    if (!vac) return res.status(404).json({ message: 'No encontrado' });
    await vac.destroy();
    return ok(res, { id: req.params.id }, 'Eliminado');
  } catch (err) { next(err); }
};
