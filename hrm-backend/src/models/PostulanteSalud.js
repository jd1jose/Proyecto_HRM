import { DataTypes, Model } from 'sequelize';

export class PostulanteSalud extends Model {}

export const initPostulanteSalud = (sequelize) => {
  PostulanteSalud.init(
    {
      postulanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'postulantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'postulante_id'
      },
      estadoSalud: { type: DataTypes.STRING(50), allowNull: true },
      padecioCovid: { type: DataTypes.BOOLEAN, allowNull: true },
      tieneVacunacionCovid: { type: DataTypes.BOOLEAN, allowNull: true },
      numeroDosisCovid: { type: DataTypes.INTEGER, allowNull: true },
      sufrioFracturas: { type: DataTypes.BOOLEAN, allowNull: true },
      sufrioOperacion: { type: DataTypes.BOOLEAN, allowNull: true },
      enfermedadCronica: { type: DataTypes.BOOLEAN, allowNull: true },
      enfermaFrecuencia: { type: DataTypes.BOOLEAN, allowNull: true },
      practicaDeportes: { type: DataTypes.BOOLEAN, allowNull: true },
      perteneceClub: { type: DataTypes.BOOLEAN, allowNull: true },
      tienePasatiempo: { type: DataTypes.BOOLEAN, allowNull: true },
      metaVida: { type: DataTypes.BOOLEAN, allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_salud',
      modelName: 'PostulanteSalud'
    }
  );
  return PostulanteSalud;
};
