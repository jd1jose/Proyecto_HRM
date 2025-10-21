import { DataTypes, Model } from 'sequelize';

export class PostulanteConsumo extends Model {}

export const initPostulanteConsumo = (sequelize) => {
  PostulanteConsumo.init(
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
      tieneTatuajes: { type: DataTypes.TEXT, allowNull: true },
      bebe: { type: DataTypes.BOOLEAN, allowNull: true },
      bebeFrecuencia: { type: DataTypes.STRING(150), allowNull: true },
      fuma: { type: DataTypes.BOOLEAN, allowNull: true },
      fumaFrecuencia: { type: DataTypes.STRING(150), allowNull: true },
      puedeViajar: { type: DataTypes.BOOLEAN, allowNull: true },
      cambiarResidencia: { type: DataTypes.BOOLEAN, allowNull: true },
      afiliadoSindicato: { type: DataTypes.BOOLEAN, allowNull: true },
      consumioDrogas: { type: DataTypes.BOOLEAN, allowNull: true },
      tieneAntecedentes: { type: DataTypes.BOOLEAN, allowNull: true },
      fechaDisponibilidad: { type: DataTypes.DATEONLY, allowNull: true },
      religion: { type: DataTypes.STRING(100), allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_consumo',
      modelName: 'PostulanteConsumo'
    }
  );
  return PostulanteConsumo;
};
