import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  sequelize,
  Informe,
  InformeGenerales,
  InformeFamiliares,
  InformeSalud,
  InformeAcademicos,
  InformeAntecedentes,
  InformeLaborales,
  InformeEconomicos,
  InformeVivienda,
  InformeRedes,
  InformeReferencias,
  InformeEntrevista,
  InformeAnexos
} from '../models/index.js';

const SECTION_CONFIG = [
  { key: 'generales', model: InformeGenerales },
  { key: 'familiares', model: InformeFamiliares },
  { key: 'salud', model: InformeSalud },
  { key: 'academico', model: InformeAcademicos },
  { key: 'antecedentes', model: InformeAntecedentes },
  { key: 'laboral', model: InformeLaborales },
  { key: 'economico', model: InformeEconomicos },
  { key: 'propiedades', model: InformeVivienda },
  { key: 'redes', model: InformeRedes },
  { key: 'referencias', model: InformeReferencias },
  { key: 'entrevista', model: InformeEntrevista },
  { key: 'anexos', model: InformeAnexos }
];

const FILES_PREFIX = '/files';
const EXPEDIENTES_ROOT = path.resolve('expedientes');
const dataUrlRegex = /^data:(image\/[a-zA-Z0-9+.\-]+);base64,(.+)$/;
const inlineDataUrlRegex = /(data:image\/[a-zA-Z0-9+.\-]+;base64,[A-Za-z0-9+/=]+)/g;
const filesPathRegex = /\/files\/[A-Za-z0-9/_\-\.]+/;

const toNullableInteger = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeValue = (value) => {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }
  if (typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = normalizeValue(val);
      return acc;
    }, {});
  }
  return value;
};

const ensureExpedientesDir = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (_error) {
    // ignore if already exists
  }
};

const saveDataUrlToFile = async (informeId, dataUrl) => {
  const normalized = dataUrl.replace(/\s+/g, '');
  const match = normalized.match(dataUrlRegex);
  if (!match) {
    return null;
  }
  const [, mimeType, base64] = match;
  const extension = mimeType.split('/')[1] || 'bin';
  const informeDir = path.join(EXPEDIENTES_ROOT, String(informeId));
  await ensureExpedientesDir(informeDir);
  const filename = `${Date.now()}-${randomUUID()}.${extension}`;
  const absolutePath = path.join(informeDir, filename);
  await fs.writeFile(absolutePath, Buffer.from(base64, 'base64'));
  const relative = `${FILES_PREFIX}/${informeId}/${filename}`.replace(/\\/g, '/');
  return relative;
};

const normalizeStoredPath = (value) => {
  if (typeof value !== 'string') {
    return null;
  }
  const match = value.match(filesPathRegex);
  return match ? match[0] : null;
};

const transformMediaValue = async (informeId, value) => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    const inlineMatch = value.match(inlineDataUrlRegex);
    if (inlineMatch && inlineMatch.length > 0) {
      let result = value;
      for (const match of inlineMatch) {
        const storedPath = await saveDataUrlToFile(informeId, match);
        if (storedPath) {
          result = result === match ? storedPath : result.replace(match, storedPath);
        }
      }
      const normalized = normalizeStoredPath(result);
      return normalized ?? result;
    }
    const normalizedPath = normalizeStoredPath(value);
    return normalizedPath ?? value;
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      value[i] = await transformMediaValue(informeId, value[i]);
    }
    return value;
  }

  if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      value[key] = await transformMediaValue(informeId, val);
    }
    return value;
  }

  return value;
};

const transformMediaForInforme = async (informeId, payload) => {
  await ensureExpedientesDir(EXPEDIENTES_ROOT);
  await transformMediaValue(informeId, payload);
};

const upsertSection = async (model, informeId, data, transaction) => {
  const normalized = data ? normalizeValue(data) : {};
  await model.upsert(
    {
      informeId,
      ...(normalized ?? {})
    },
    { transaction }
  );
};

const persistSecciones = async (informeId, payload, transaction) => {
  for (const section of SECTION_CONFIG) {
    await upsertSection(section.model, informeId, payload[section.key], transaction);
  }
};

const persistInforme = async (payload, estado) => {
  const postulanteId = toNullableInteger(payload.postulanteId);
  const vacancyId = toNullableInteger(payload.vacancyId);
  const targetEstado = estado ?? payload.estado ?? 'borrador';

  const transaction = await sequelize.transaction();
  try {
    let informe;
    if (payload.id) {
      informe = await Informe.findByPk(payload.id, { transaction });
      if (!informe) {
        throw Object.assign(new Error('Informe no encontrado'), { statusCode: 404 });
      }
      await informe.update(
        {
          postulanteId,
          vacancyId,
          estado: targetEstado
        },
        { transaction }
      );
    } else {
      informe = await Informe.create(
        {
          postulanteId,
          vacancyId,
          estado: targetEstado
        },
        { transaction }
      );
    }

    await transformMediaForInforme(informe.id, payload);
    await persistSecciones(informe.id, payload, transaction);
    await transaction.commit();
    return informe;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const saveInforme = async (req, res, next) => {
  try {
    const informe = await persistInforme(req.body ?? {}, 'borrador');
    return res.status(req.body?.id ? 200 : 201).json({
      data: {
        id: informe.id,
        estado: informe.estado
      }
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return next(error);
  }
};

export const updateInforme = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ message: 'Identificador inválido.' });
    }
    const payload = { ...(req.body ?? {}), id };
    const informe = await persistInforme(payload, 'borrador');
    return res.status(200).json({
      data: {
        id: informe.id,
        estado: informe.estado
      }
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return next(error);
  }
};

export const generateInforme = async (req, res, next) => {
  try {
    const informe = await persistInforme(req.body ?? {}, 'generado');
    return res.status(200).json({
      data: {
        id: informe.id,
        estado: informe.estado
      }
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return next(error);
  }
};

const parseQueryId = (value) => {
  if (value === undefined) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
};

const cleanSection = (section) => {
  if (!section) {
    return null;
  }
  const { informeId, created_at, updated_at, createdAt, updatedAt, ...rest } = section;
  return rest;
};

const buildInformeResponse = (informeInstance) => {
  const plain = informeInstance.get({ plain: true });
  return {
    id: plain.id,
    postulanteId: plain.postulanteId,
    vacancyId: plain.vacancyId,
    estado: plain.estado,
    generales: cleanSection(plain.generales),
    familiares: cleanSection(plain.familiares),
    salud: cleanSection(plain.salud),
    academico: cleanSection(plain.academico),
    antecedentes: cleanSection(plain.antecedentes),
    laboral: cleanSection(plain.laboral),
    economico: cleanSection(plain.economico),
    propiedades: cleanSection(plain.propiedades),
    redes: cleanSection(plain.redes),
    referencias: cleanSection(plain.referencias),
    entrevista: cleanSection(plain.entrevista),
    anexos: cleanSection(plain.anexos)
  };
};

export const findInforme = async (req, res, next) => {
  try {
    const informeId = parseQueryId(req.query.informeId);
    const postulanteId = parseQueryId(req.query.postulanteId);
    const vacancyId = parseQueryId(req.query.vacancyId);

    const where = {};
    if (informeId) {
      where.id = informeId;
    }
    if (postulanteId) {
      where.postulanteId = postulanteId;
    }
    if (vacancyId) {
      where.vacancyId = vacancyId;
    }

    if (Object.keys(where).length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar al menos un identificador para buscar el informe.' });
    }

    const informe = await Informe.findOne({
      where,
      include: SECTION_CONFIG.map(({ key, model }) => ({
        model,
        as: key,
        required: false
      }))
    });

    if (!informe) {
      return res.status(200).json({ data: null });
    }

    return res.status(200).json({ data: buildInformeResponse(informe) });
  } catch (error) {
    return next(error);
  }
};
