import { DataTypes, Model } from 'sequelize';

export class PostulanteEconomicos extends Model {}

export const initPostulanteEconomicos = (sequelize) => {
  PostulanteEconomicos.init(
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
      otrosIngresos: { type: DataTypes.BOOLEAN, allowNull: true },
      descripcionIngresos: { type: DataTypes.TEXT, allowNull: true },
      conyugeTrabaja: { type: DataTypes.BOOLEAN, allowNull: true },
      casaPropia: { type: DataTypes.BOOLEAN, allowNull: true },
      pagaRenta: { type: DataTypes.BOOLEAN, allowNull: true },
      tieneDeudas: { type: DataTypes.BOOLEAN, allowNull: true },
      deudaCobroJudicial: { type: DataTypes.BOOLEAN, allowNull: true },
      abonoMensual: { type: DataTypes.STRING(80), allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_economicos',
      modelName: 'PostulanteEconomicos'
    }
  );
  return PostulanteEconomicos;
};
