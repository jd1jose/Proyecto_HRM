import { sequelize } from '../config/database.js';
import { initUser, User } from './User.js';
import { initVacancy, Vacancy } from './Vacancy.js';

initUser(sequelize);
initVacancy(sequelize);

// Relaciones futuras (ej.: User hasMany VacancyCreatedBy, etc.)

export { sequelize, User, Vacancy };
