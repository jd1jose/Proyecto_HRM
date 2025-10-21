import { DataTypes, Model } from 'sequelize';

export class Vacancy extends Model {}

export const initVacancy = (sequelize) => {
  Vacancy.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      puesto: { type: DataTypes.STRING(200), allowNull: false },
      descripcion: { type: DataTypes.TEXT, allowNull: false },
      contacto: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: { isEmail: true }
      },
      categoria: { type: DataTypes.STRING(120), allowNull: false },
      tipoContrato: { type: DataTypes.STRING(60), allowNull: false },
      experiencia: { type: DataTypes.STRING(60), allowNull: false },
      educacion: { type: DataTypes.STRING(60), allowNull: false },
      departamento: { type: DataTypes.STRING(120), allowNull: false },
      ciudad: { type: DataTypes.STRING(120), allowNull: false },
      cantidadVacantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: 1 }
      },
      salario: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: { min: 0 }
      },
      tipoPago: { type: DataTypes.STRING(60), allowNull: false },
      estado: {
        type: DataTypes.ENUM('abierta', 'cerrada', 'en_proceso', 'confirmar_postulantes', 'informe_riesgo'),
        allowNull: false,
        defaultValue: 'abierta'
      }
    },
    {
      sequelize,
      tableName: 'vacancies',
      modelName: 'Vacancy'
    }
  );
  return Vacancy;
};
