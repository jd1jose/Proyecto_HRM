import { DataTypes, Model } from 'sequelize';

export class Vacancy extends Model {}

export const initVacancy = (sequelize) => {
  Vacancy.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title:       { type: DataTypes.STRING(200), allowNull: false },
    department:  { type: DataTypes.STRING(120), allowNull: true },
    location:    { type: DataTypes.STRING(120), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status:      { type: DataTypes.ENUM('abierta','cerrada','en_proceso'), defaultValue: 'abierta' }
  }, {
    sequelize,
    tableName: 'vacancies'
  });
  return Vacancy;
};
