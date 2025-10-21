import Joi from 'joi';
import { Op } from 'sequelize';
import {
  sequelize,
  Postulante,
  PostulanteSalud,
  PostulanteFamiliares,
  PostulanteAcademicos,
  PostulanteLaborales,
  PostulantePersonales,
  PostulanteConsumo,
  PostulanteEconomicos
} from '../models/index.js';
import { created, ok } from '../utils/responses.js';

const sectionSchema = Joi.object().unknown(true);

const createSchema = Joi.object({
  generales: sectionSchema.required(),
  salud: sectionSchema.required(),
  familiares: sectionSchema.required(),
  academicos: sectionSchema.required(),
  laborales: sectionSchema.required(),
  personales: sectionSchema.required(),
  consumo: sectionSchema.required(),
  economicos: sectionSchema.required()
});

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

const toTrimmedString = (value) => {
  if (isEmptyValue(value)) {
    return null;
  }
  const trimmed = String(value).trim();
  return trimmed.length === 0 ? null : trimmed;
};

const toInteger = (value) => {
  if (isEmptyValue(value)) {
    return null;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const toBoolean = (value) => {
  if (isEmptyValue(value)) {
    return null;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value !== 0;
  }
  const normalized = String(value).trim().toLowerCase();
  if (['true', '1', 'si', 's'].includes(normalized)) {
    return true;
  }
  if (['false', '0', 'no', 'n'].includes(normalized)) {
    return false;
  }
  return Boolean(normalized);
};

const toDateString = (value) => (isEmptyValue(value) ? null : String(value));

const mapGenerales = (generales = {}) => ({
  nombreCompleto: toTrimmedString(generales.nombreCompleto),
  puestoSolicita: toTrimmedString(generales.puestoSolicita),
  pretensionSalarial: toTrimmedString(generales.pretensionSalarial),
  profesion: toTrimmedString(generales.profesion),
  lugarNacimiento: toTrimmedString(generales.lugarNacimiento),
  fechaNacimiento: toDateString(generales.fechaNacimiento),
  edadActual: toInteger(generales.edadActual),
  estatura: toTrimmedString(generales.estatura),
  grupoSanguineo: toTrimmedString(generales.grupoSanguineo),
  direccionCompleta: toTrimmedString(generales.direccionCompleta),
  telefonoContacto: toTrimmedString(generales.telefonoContacto),
  contactoEmergencia: toTrimmedString(generales.contactoEmergencia),
  estadoCivil: toTrimmedString(generales.estadoCivil),
  viveCon: toTrimmedString(generales.viveCon),
  dependientes: toTrimmedString(generales.dependientes),
  dpi: toTrimmedString(generales.dpi),
  nit: toTrimmedString(generales.nit),
  igss: toTrimmedString(generales.igss),
  irtra: toTrimmedString(generales.irtra),
  licenciaTipo: toTrimmedString(generales.licenciaTipo),
  documentoTrabajo: toTrimmedString(generales.documentoTrabajo),
  medioTransporte: toTrimmedString(generales.medioTransporte)
});

const mapSalud = (salud = {}) => ({
  estadoSalud: toTrimmedString(salud.estadoSalud),
  padecioCovid: toBoolean(salud.padecioCovid),
  tieneVacunacionCovid: toBoolean(salud.tieneVacunacionCovid),
  numeroDosisCovid: toInteger(salud.numeroDosisCovid),
  sufrioFracturas: toBoolean(salud.sufrioFracturas),
  sufrioOperacion: toBoolean(salud.sufrioOperacion),
  enfermedadCronica: toBoolean(salud.enfermedadCronica),
  enfermaFrecuencia: toBoolean(salud.enfermaFrecuencia),
  practicaDeportes: toBoolean(salud.practicaDeportes),
  perteneceClub: toBoolean(salud.perteneceClub),
  tienePasatiempo: toBoolean(salud.tienePasatiempo),
  metaVida: toBoolean(salud.metaVida)
});

const mapFamiliares = (familiares = {}) => ({
  padreNombre: toTrimmedString(familiares.padreNombre),
  padreEdad: toInteger(familiares.padreEdad),
  padreVive: toBoolean(familiares.padreVive),
  padreViveConUsted: toBoolean(familiares.padreViveConUsted),
  madreNombre: toTrimmedString(familiares.madreNombre),
  madreEdad: toInteger(familiares.madreEdad),
  madreVive: toBoolean(familiares.madreVive),
  madreViveConUsted: toBoolean(familiares.madreViveConUsted),
  conyugeNombre: toTrimmedString(familiares.conyugeNombre),
  conyugeEdad: toInteger(familiares.conyugeEdad),
  conyugeVive: toBoolean(familiares.conyugeVive),
  conyugeViveConUsted: toBoolean(familiares.conyugeViveConUsted),
  conyugeOcupacion: toTrimmedString(familiares.conyugeOcupacion),
  hijosNombre: toTrimmedString(familiares.hijosNombre),
  hijosEdad: toInteger(familiares.hijosEdad),
  hermanosNombre: toTrimmedString(familiares.hermanosNombre),
  hermanosEdad: toInteger(familiares.hermanosEdad)
});

const mapAcademicos = (academicos = {}) => ({
  primariaEstablecimiento: toTrimmedString(academicos.primariaEstablecimiento),
  primariaAnios: toTrimmedString(academicos.primariaAnios),
  basicosEstablecimiento: toTrimmedString(academicos.basicosEstablecimiento),
  basicosAnios: toTrimmedString(academicos.basicosAnios),
  diversificadoEstablecimiento: toTrimmedString(academicos.diversificadoEstablecimiento),
  diversificadoCarrera: toTrimmedString(academicos.diversificadoCarrera),
  diversificadoAnios: toTrimmedString(academicos.diversificadoAnios),
  tecnicaEstablecimiento: toTrimmedString(academicos.tecnicaEstablecimiento),
  tecnicaCarrera: toTrimmedString(academicos.tecnicaCarrera),
  tecnicaAnios: toTrimmedString(academicos.tecnicaAnios),
  universidadCuenta: toBoolean(academicos.universidadCuenta),
  universidadDetalle: toTrimmedString(academicos.universidadDetalle),
  postgradoCuenta: toBoolean(academicos.postgradoCuenta),
  postgradoDetalle: toTrimmedString(academicos.postgradoDetalle),
  idiomas: toTrimmedString(academicos.idiomas),
  software: toTrimmedString(academicos.software),
  maquinas: toTrimmedString(academicos.maquinas),
  otrasFunciones: toTrimmedString(academicos.otrasFunciones),
  experienciaLaboral: toBoolean(academicos.experienciaLaboral)
});

const mapLaborales = (laborales = {}) => ({
  empresaNombre: toTrimmedString(laborales.empresaNombre),
  empresaDireccion: toTrimmedString(laborales.empresaDireccion),
  empresaTelefono: toTrimmedString(laborales.empresaTelefono),
  puestoDesempenado: toTrimmedString(laborales.puestoDesempenado),
  salarioDevengado: toTrimmedString(laborales.salarioDevengado),
  fechaIngreso: toDateString(laborales.fechaIngreso),
  fechaSalida: toDateString(laborales.fechaSalida),
  funciones: toTrimmedString(laborales.funciones),
  jefeNombre: toTrimmedString(laborales.jefeNombre),
  jefePuesto: toTrimmedString(laborales.jefePuesto),
  motivoRetiro: toTrimmedString(laborales.motivoRetiro),
  sePuedeReferenciar: toBoolean(laborales.sePuedeReferenciar)
});

const mapPersonales = (personales = {}) => ({
  nombre: toTrimmedString(personales.nombre),
  telefono: toTrimmedString(personales.telefono),
  tiempoConocerlo: toTrimmedString(personales.tiempoConocerlo)
});

const mapConsumo = (consumo = {}) => ({
  tieneTatuajes: toTrimmedString(consumo.tieneTatuajes),
  bebe: toBoolean(consumo.bebe),
  bebeFrecuencia: toTrimmedString(consumo.bebeFrecuencia),
  fuma: toBoolean(consumo.fuma),
  fumaFrecuencia: toTrimmedString(consumo.fumaFrecuencia),
  puedeViajar: toBoolean(consumo.puedeViajar),
  cambiarResidencia: toBoolean(consumo.cambiarResidencia),
  afiliadoSindicato: toBoolean(consumo.afiliadoSindicato),
  consumioDrogas: toBoolean(consumo.consumioDrogas),
  tieneAntecedentes: toBoolean(consumo.tieneAntecedentes),
  fechaDisponibilidad: toDateString(consumo.fechaDisponibilidad),
  religion: toTrimmedString(consumo.religion)
});

const mapEconomicos = (economicos = {}) => ({
  otrosIngresos: toBoolean(economicos.otrosIngresos),
  descripcionIngresos: toTrimmedString(economicos.descripcionIngresos),
  conyugeTrabaja: toBoolean(economicos.conyugeTrabaja),
  casaPropia: toBoolean(economicos.casaPropia),
  pagaRenta: toBoolean(economicos.pagaRenta),
  tieneDeudas: toBoolean(economicos.tieneDeudas),
  deudaCobroJudicial: toBoolean(economicos.deudaCobroJudicial),
  abonoMensual: toTrimmedString(economicos.abonoMensual)
});

const normalizePayload = (payload) => ({
  generales: mapGenerales(payload.generales),
  salud: mapSalud(payload.salud),
  familiares: mapFamiliares(payload.familiares),
  academicos: mapAcademicos(payload.academicos),
  laborales: mapLaborales(payload.laborales),
  personales: mapPersonales(payload.personales),
  consumo: mapConsumo(payload.consumo),
  economicos: mapEconomicos(payload.economicos)
});

const stripSection = (section) => {
  if (!section) {
    return null;
  }
  const { postulanteId, createdAt, updatedAt, ...rest } = section;
  return rest;
};

const serializePostulante = (instance) => {
  if (!instance) {
    return null;
  }
  const plain = instance.get({ plain: true });
  const {
    id,
    createdAt,
    updatedAt,
    estado,
    salud,
    familiares,
    academicos,
    laborales,
    personales,
    consumo,
    economicos,
    ...generales
  } = plain;

  return {
    id,
    estado,
    createdAt,
    updatedAt,
    generales,
    salud: stripSection(salud),
    familiares: stripSection(familiares),
    academicos: stripSection(academicos),
    laborales: stripSection(laborales),
    personales: stripSection(personales),
    consumo: stripSection(consumo),
    economicos: stripSection(economicos)
  };
};

export const listPostulantes = async (req, res, next) => {
  try {
    const { search, profesion, estadoCivil, page = 1, size = 10 } = req.query;
    const pageNumber = Math.max(Number(page) || 1, 1);
    const sizeNumber = Math.min(Math.max(Number(size) || 10, 1), 100);
    const where = { estado: 'activo' };
    const andConditions = [];

    if (search && String(search).trim().length > 0) {
      const like = `%${String(search).trim()}%`;
      andConditions.push({
        [Op.or]: [
          { nombreCompleto: { [Op.iLike]: like } },
          { puestoSolicita: { [Op.iLike]: like } },
          { profesion: { [Op.iLike]: like } }
        ]
      });
    }

    if (profesion && String(profesion).trim().length > 0) {
      andConditions.push({
        profesion: { [Op.iLike]: `%${String(profesion).trim()}%` }
      });
    }

    if (estadoCivil && String(estadoCivil).trim().length > 0) {
      andConditions.push({
        estadoCivil: { [Op.iLike]: String(estadoCivil).trim() }
      });
    }

    if (andConditions.length) {
      where[Op.and] = andConditions;
    }

    const result = await Postulante.findAndCountAll({
      where,
      limit: sizeNumber,
      offset: (pageNumber - 1) * sizeNumber,
      order: [['id', 'DESC']]
    });

    return ok(res, {
      items: result.rows.map(serializePostulante),
      total: result.count,
      page: pageNumber,
      size: sizeNumber
    });
  } catch (err) {
    next(err);
  }
};

export const createPostulante = async (req, res, next) => {
  try {
    const { value, error } = createSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const normalized = normalizePayload(value);

    const postulante = await sequelize.transaction(async (transaction) => {
      const base = await Postulante.create(
        { estado: 'activo', ...normalized.generales },
        { transaction }
      );

      await PostulanteSalud.create(
        { postulanteId: base.id, ...normalized.salud },
        { transaction }
      );

      await PostulanteFamiliares.create(
        { postulanteId: base.id, ...normalized.familiares },
        { transaction }
      );

      await PostulanteAcademicos.create(
        { postulanteId: base.id, ...normalized.academicos },
        { transaction }
      );

      await PostulanteLaborales.create(
        { postulanteId: base.id, ...normalized.laborales },
        { transaction }
      );

      await PostulantePersonales.create(
        { postulanteId: base.id, ...normalized.personales },
        { transaction }
      );

      await PostulanteConsumo.create(
        { postulanteId: base.id, ...normalized.consumo },
        { transaction }
      );

      await PostulanteEconomicos.create(
        { postulanteId: base.id, ...normalized.economicos },
        { transaction }
      );

      return base;
    });

    const recienCreado = await Postulante.findByPk(postulante.id, {
      include: [
        { model: PostulanteSalud, as: 'salud' },
        { model: PostulanteFamiliares, as: 'familiares' },
        { model: PostulanteAcademicos, as: 'academicos' },
        { model: PostulanteLaborales, as: 'laborales' },
        { model: PostulantePersonales, as: 'personales' },
        { model: PostulanteConsumo, as: 'consumo' },
        { model: PostulanteEconomicos, as: 'economicos' }
      ]
    });

    return created(res, serializePostulante(recienCreado));
  } catch (err) {
    next(err);
  }
};

