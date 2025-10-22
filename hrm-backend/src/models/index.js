import { sequelize } from '../config/database.js';
import { initUser, User } from './User.js';
import { initVacancy, Vacancy } from './Vacancy.js';
import { initPostulante, Postulante } from './Postulante.js';
import { initPostulanteSalud, PostulanteSalud } from './PostulanteSalud.js';
import { initPostulanteFamiliares, PostulanteFamiliares } from './PostulanteFamiliares.js';
import { initPostulanteAcademicos, PostulanteAcademicos } from './PostulanteAcademicos.js';
import { initPostulanteLaborales, PostulanteLaborales } from './PostulanteLaborales.js';
import { initPostulantePersonales, PostulantePersonales } from './PostulantePersonales.js';
import { initPostulanteConsumo, PostulanteConsumo } from './PostulanteConsumo.js';
import { initPostulanteEconomicos, PostulanteEconomicos } from './PostulanteEconomicos.js';
import { initVacancyPostulante, VacancyPostulante } from './VacancyPostulante.js';
import { initInforme, Informe } from './Informe.js';
import { initInformeGenerales, InformeGenerales } from './InformeGenerales.js';
import { initInformeFamiliares, InformeFamiliares } from './InformeFamiliares.js';
import { initInformeSalud, InformeSalud } from './InformeSalud.js';
import { initInformeAcademicos, InformeAcademicos } from './InformeAcademicos.js';
import { initInformeAntecedentes, InformeAntecedentes } from './InformeAntecedentes.js';
import { initInformeLaborales, InformeLaborales } from './InformeLaborales.js';
import { initInformeEconomicos, InformeEconomicos } from './InformeEconomicos.js';
import { initInformeVivienda, InformeVivienda } from './InformeVivienda.js';
import { initInformeRedes, InformeRedes } from './InformeRedes.js';
import { initInformeReferencias, InformeReferencias } from './InformeReferencias.js';
import { initInformeEntrevista, InformeEntrevista } from './InformeEntrevista.js';
import { initInformeAnexos, InformeAnexos } from './InformeAnexos.js';

initUser(sequelize);
initVacancy(sequelize);
initPostulante(sequelize);
initPostulanteSalud(sequelize);
initPostulanteFamiliares(sequelize);
initPostulanteAcademicos(sequelize);
initPostulanteLaborales(sequelize);
initPostulantePersonales(sequelize);
initPostulanteConsumo(sequelize);
initPostulanteEconomicos(sequelize);
initVacancyPostulante(sequelize);
initInforme(sequelize);
initInformeGenerales(sequelize);
initInformeFamiliares(sequelize);
initInformeSalud(sequelize);
initInformeAcademicos(sequelize);
initInformeAntecedentes(sequelize);
initInformeLaborales(sequelize);
initInformeEconomicos(sequelize);
initInformeVivienda(sequelize);
initInformeRedes(sequelize);
initInformeReferencias(sequelize);
initInformeEntrevista(sequelize);
initInformeAnexos(sequelize);

Postulante.hasOne(PostulanteSalud, { as: 'salud', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulanteSalud.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Postulante.hasOne(PostulanteFamiliares, { as: 'familiares', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulanteFamiliares.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Postulante.hasOne(PostulanteAcademicos, { as: 'academicos', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulanteAcademicos.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Postulante.hasOne(PostulanteLaborales, { as: 'laborales', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulanteLaborales.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Postulante.hasOne(PostulantePersonales, { as: 'personales', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulantePersonales.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Postulante.hasOne(PostulanteConsumo, { as: 'consumo', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulanteConsumo.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Postulante.hasOne(PostulanteEconomicos, { as: 'economicos', foreignKey: 'postulanteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PostulanteEconomicos.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });

Vacancy.belongsToMany(Postulante, {
  through: VacancyPostulante,
  as: 'postulantes',
  foreignKey: 'vacancyId',
  otherKey: 'postulanteId'
});
Postulante.belongsToMany(Vacancy, {
  through: VacancyPostulante,
  as: 'vacancies',
  foreignKey: 'postulanteId',
  otherKey: 'vacancyId'
});

VacancyPostulante.belongsTo(Vacancy, { as: 'vacancy', foreignKey: 'vacancyId' });
VacancyPostulante.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });
Vacancy.hasMany(VacancyPostulante, { as: 'asignaciones', foreignKey: 'vacancyId' });
Postulante.hasMany(VacancyPostulante, { as: 'asignaciones', foreignKey: 'postulanteId' });

Informe.belongsTo(Postulante, { as: 'postulante', foreignKey: 'postulanteId' });
Informe.belongsTo(Vacancy, { as: 'vacancy', foreignKey: 'vacancyId' });
Informe.hasOne(InformeGenerales, { as: 'generales', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeGenerales.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeFamiliares, { as: 'familiares', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeFamiliares.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeSalud, { as: 'salud', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeSalud.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeAcademicos, { as: 'academico', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeAcademicos.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeAntecedentes, { as: 'antecedentes', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeAntecedentes.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeLaborales, { as: 'laboral', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeLaborales.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeEconomicos, { as: 'economico', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeEconomicos.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeVivienda, { as: 'propiedades', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeVivienda.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeRedes, { as: 'redes', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeRedes.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeReferencias, { as: 'referencias', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeReferencias.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeEntrevista, { as: 'entrevista', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeEntrevista.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });
Informe.hasOne(InformeAnexos, { as: 'anexos', foreignKey: 'informeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
InformeAnexos.belongsTo(Informe, { as: 'informe', foreignKey: 'informeId' });

export {
  sequelize,
  User,
  Vacancy,
  Postulante,
  PostulanteSalud,
  PostulanteFamiliares,
  PostulanteAcademicos,
  PostulanteLaborales,
  PostulantePersonales,
  PostulanteConsumo,
  PostulanteEconomicos,
  VacancyPostulante,
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
};
