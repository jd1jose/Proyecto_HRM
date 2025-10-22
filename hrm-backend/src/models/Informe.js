import { DataTypes, Model } from 'sequelize';

export class Informe extends Model {}

export const initInforme = (sequelize) => {
  Informe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      postulanteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'postulante_id',
        references: { model: 'postulantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      vacancyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'vacancy_id',
        references: { model: 'vacancies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      estado: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'borrador'
      }
    },
    {
      sequelize,
      tableName: 'informes',
      modelName: 'Informe',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Informe;
};
