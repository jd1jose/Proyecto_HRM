import Joi from 'joi';
import { Op } from 'sequelize';
import { sequelize, Vacancy, Postulante, VacancyPostulante } from '../models/index.js';
import { ok, created } from '../utils/responses.js';

const baseSchema = Joi.object({
  puesto: Joi.string().trim().min(3).max(200),
  descripcion: Joi.string().trim().min(10),
  contacto: Joi.string().trim().email(),
  categoria: Joi.string().trim().max(120),
  tipoContrato: Joi.string().trim().max(60),
  experiencia: Joi.string().trim().max(60),
  educacion: Joi.string().trim().max(60),
  departamento: Joi.string().trim().max(120),
  ciudad: Joi.string().trim().max(120),
  cantidadVacantes: Joi.number().integer().min(1),
  salario: Joi.number().precision(2).min(0),
  tipoPago: Joi.string().trim().max(60),
  estado: Joi.string().valid('abierta', 'cerrada', 'en_proceso')
});

const createSchema = baseSchema.fork(
  [
    'puesto',
    'descripcion',
    'contacto',
    'categoria',
    'tipoContrato',
    'experiencia',
    'educacion',
    'departamento',
    'ciudad',
    'cantidadVacantes',
    'salario',
    'tipoPago'
  ],
  (schema) => schema.required()
);

const formatValidationError = (error) =>
  error?.details?.map((detail) => detail.message).join(', ') || error?.message;

const normalizePayload = (payload, { assignDefaultEstado = false } = {}) => {
  if (payload.contacto) {
    payload.contacto = payload.contacto.toLowerCase();
  }
  if (assignDefaultEstado && !payload.estado) {
    payload.estado = 'abierta';
  }
  return payload;
};

const assignSchema = Joi.object({
  postulanteIds: Joi.array().items(Joi.number().integer().positive()).min(0).required()
});

const riskReportSchema = Joi.object({
  postulanteIds: Joi.array().items(Joi.number().integer().positive()).min(1).required()
});

const serializeVacancy = (vacancy) => {
  if (!vacancy) {
    return null;
  }
  const plain = vacancy.get({ plain: true });
  if (plain.postulantes) {
    plain.postulantes = plain.postulantes.map((postulante) => ({
      id: postulante.id,
      estado: postulante.estado,
      nombreCompleto: postulante.nombreCompleto,
      puestoSolicita: postulante.puestoSolicita,
      profesion: postulante.profesion,
      telefonoContacto: postulante.telefonoContacto
    }));
  }
  return plain;
};

export const listVacancies = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const estado = req.query.status || req.query.estado;
    const offset = (page - 1) * size;
    const where = estado ? { estado } : undefined;
    const data = await Vacancy.findAndCountAll({
      where,
      limit: Number(size),
      offset: Number(offset),
      order: [['id', 'DESC']]
    });
    return ok(res, { items: data.rows, total: data.count, page: Number(page), size: Number(size) });
  } catch (err) {
    next(err);
  }
};

export const listPostulantesInforme = async (_req, res, next) => {
  try {
    const asignaciones = await VacancyPostulante.findAll({
      where: { estado: 'generar_informe' },
      include: [
        {
          model: Postulante,
          as: 'postulante',
          attributes: ['id', 'nombreCompleto', 'puestoSolicita', 'profesion', 'estado']
        },
        {
          model: Vacancy,
          as: 'vacancy',
          attributes: ['id', 'puesto', 'categoria', 'ciudad', 'estado']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    const data = asignaciones.map((item) => {
      const plain = item.get({ plain: true });
      return {
        id: plain.id,
        estadoAsignacion: plain.estado,
        postulanteId: plain.postulanteId,
        vacancyId: plain.vacancyId,
        postulante: plain.postulante
          ? {
              id: plain.postulante.id,
              nombreCompleto: plain.postulante.nombreCompleto,
              puestoSolicita: plain.postulante.puestoSolicita,
              profesion: plain.postulante.profesion,
              estado: plain.postulante.estado
            }
          : null,
        vacante: plain.vacancy
          ? {
              id: plain.vacancy.id,
              puesto: plain.vacancy.puesto,
              categoria: plain.vacancy.categoria,
              ciudad: plain.vacancy.ciudad,
              estado: plain.vacancy.estado
            }
          : null
      };
    });

    return ok(res, data);
  } catch (err) {
    next(err);
  }
};

export const getVacancy = async (req, res, next) => {
  try {
    const vac = await Vacancy.findByPk(req.params.id, {
      include: [
        {
          model: Postulante,
          as: 'postulantes',
          through: { attributes: [] },
          attributes: ['id', 'estado', 'nombreCompleto', 'puestoSolicita', 'profesion', 'telefonoContacto']
        }
      ]
    });
    if (!vac) return res.status(404).json({ message: 'Vacante no encontrada' });
    return ok(res, serializeVacancy(vac));
  } catch (err) {
    next(err);
  }
};

export const createVacancy = async (req, res, next) => {
  try {
    const { value, error } = createSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: formatValidationError(error) });
    const payload = normalizePayload({ ...value }, { assignDefaultEstado: true });
    const vac = await Vacancy.create(payload);
    return created(res, vac);
  } catch (err) {
    next(err);
  }
};

export const updateVacancy = async (req, res, next) => {
  try {
    const { value, error } = baseSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: formatValidationError(error) });
    if (!Object.keys(value).length) return res.status(400).json({ message: 'No se recibieron datos para actualizar.' });

    const vac = await Vacancy.findByPk(req.params.id);
    if (!vac) return res.status(404).json({ message: 'Vacante no encontrada' });

    const payload = normalizePayload({ ...value });
    await vac.update(payload);
    return ok(res, vac);
  } catch (err) {
    next(err);
  }
};

export const deleteVacancy = async (req, res, next) => {
  try {
    const vac = await Vacancy.findByPk(req.params.id);
    if (!vac) return res.status(404).json({ message: 'Vacante no encontrada' });
    await vac.destroy();
    return ok(res, { id: req.params.id }, 'Eliminado');
  } catch (err) {
    next(err);
  }
};

export const assignPostulantes = async (req, res, next) => {
  try {
    const vacancyId = Number(req.params.id);
    if (!Number.isInteger(vacancyId)) {
      return res.status(400).json({ message: 'Identificador de vacante invalido.' });
    }

    const { value, error } = assignSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const postulanteIds = Array.from(new Set(value.postulanteIds || []));
    const vacancy = await Vacancy.findByPk(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    if (postulanteIds.length > 0) {
      const postulantes = await Postulante.findAll({
        where: { id: postulanteIds, estado: 'activo' }
      });
      if (postulantes.length !== postulanteIds.length) {
        return res
          .status(400)
          .json({ message: 'Uno o mas postulantes no existen o no estan activos.' });
      }
    }

    await sequelize.transaction(async (transaction) => {
      if (postulanteIds.length === 0) {
        await VacancyPostulante.destroy({ where: { vacancyId }, transaction });
        return;
      }

      await VacancyPostulante.destroy({
        where: {
          vacancyId,
          postulanteId: { [Op.notIn]: postulanteIds }
        },
        transaction
      });

      const bulkPayload = postulanteIds.map((postulanteId) => ({
        vacancyId,
        postulanteId
      }));

      await VacancyPostulante.bulkCreate(bulkPayload, {
        transaction,
        ignoreDuplicates: true
      });
    });

    const actualizado = await Vacancy.findByPk(vacancyId, {
      include: [
        {
          model: Postulante,
          as: 'postulantes',
          through: { attributes: [] },
          attributes: ['id', 'estado', 'nombreCompleto', 'puestoSolicita', 'profesion', 'telefonoContacto']
        }
      ]
    });

    return ok(res, serializeVacancy(actualizado), 'Asignaciones actualizadas');
  } catch (err) {
    next(err);
  }
};

export const closeVacancy = async (req, res, next) => {
  try {
    const vacancyId = Number(req.params.id);
    if (!Number.isInteger(vacancyId)) {
      return res.status(400).json({ message: 'Identificador de vacante invalido.' });
    }

    const vacancy = await Vacancy.findByPk(vacancyId, {
      include: [
        {
          model: Postulante,
          as: 'postulantes',
          through: { attributes: [] },
          attributes: ['id']
        }
      ]
    });

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    const postulanteIds = vacancy.postulantes?.map((postulante) => postulante.id) || [];

    await sequelize.transaction(async (transaction) => {
      await vacancy.update({ estado: 'confirmar_postulantes' }, { transaction });
      if (postulanteIds.length > 0) {
        await Postulante.update(
          { estado: 'seleccionado' },
          { where: { id: postulanteIds }, transaction }
        );
      }
    });

    const actualizado = await Vacancy.findByPk(vacancyId, {
      include: [
        {
          model: Postulante,
          as: 'postulantes',
          through: { attributes: [] },
          attributes: ['id', 'estado', 'nombreCompleto', 'puestoSolicita', 'profesion', 'telefonoContacto']
        }
      ]
    });

    return ok(res, serializeVacancy(actualizado), 'Vacante actualizada');
  } catch (err) {
    next(err);
  }
};

export const markPostulantesForRiskReport = async (req, res, next) => {
  try {
    const vacancyId = Number(req.params.id);
    if (!Number.isInteger(vacancyId)) {
      return res.status(400).json({ message: 'Identificador de vacante invalido.' });
    }

    const { value, error } = riskReportSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const vacancy = await Vacancy.findByPk(vacancyId, {
      include: [
        {
          model: Postulante,
          as: 'postulantes',
          through: { attributes: [] },
          attributes: ['id', 'estado']
        }
      ]
    });

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    const asignados = vacancy.postulantes?.map((postulante) => postulante.id) || [];
    const asignadosSet = new Set(asignados);
    const seleccionados = value.postulanteIds || [];
    const noAsignados = seleccionados.filter((id) => !asignadosSet.has(id));

    if (noAsignados.length > 0) {
      return res
        .status(400)
        .json({ message: 'Uno o mas postulantes no pertenecen a la vacante seleccionada.' });
    }

    const seleccionadosSet = new Set(seleccionados);
    const otros = asignados.filter((id) => !seleccionadosSet.has(id));

    await sequelize.transaction(async (transaction) => {
      await vacancy.update({ estado: 'informe_riesgo' }, { transaction });
      if (seleccionados.length > 0) {
        await Postulante.update(
          { estado: 'generar_informe' },
          { where: { id: seleccionados }, transaction }
        );
        await VacancyPostulante.update(
          { estado: 'generar_informe' },
          { where: { vacancyId, postulanteId: { [Op.in]: seleccionados } }, transaction }
        );
      }
      if (otros.length > 0) {
        await Postulante.update(
          { estado: 'seleccionado' },
          { where: { id: otros }, transaction }
        );
        await VacancyPostulante.update(
          { estado: 'seleccionado' },
          { where: { vacancyId, postulanteId: { [Op.in]: otros } }, transaction }
        );
      }
    });

    const actualizado = await Vacancy.findByPk(vacancyId, {
      include: [
        {
          model: Postulante,
          as: 'postulantes',
          through: { attributes: [] },
          attributes: ['id', 'estado', 'nombreCompleto', 'puestoSolicita', 'profesion', 'telefonoContacto']
        }
      ]
    });

    return ok(res, serializeVacancy(actualizado), 'Postulantes marcados para informe de riesgo');
  } catch (err) {
    next(err);
  }
};







