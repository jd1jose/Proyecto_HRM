import { DataTypes, Model } from 'sequelize';

export class VacancyPostulante extends Model {}

export const initVacancyPostulante = (sequelize) => {
  VacancyPostulante.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      vacancyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'vacancies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'vacancy_id'
      },
      postulanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'postulantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'postulante_id'
      },
      estado: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'asignado' }
    },
    {
      sequelize,
      tableName: 'vacancies_postulantes',
      modelName: 'VacancyPostulante',
      indexes: [
        {
          unique: true,
          fields: ['vacancy_id', 'postulante_id'],
          name: 'vacancy_postulante_unique'
        }
      ]
    }
  );
  return VacancyPostulante;
};
