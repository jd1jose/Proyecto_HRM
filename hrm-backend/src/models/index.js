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
  VacancyPostulante
};
