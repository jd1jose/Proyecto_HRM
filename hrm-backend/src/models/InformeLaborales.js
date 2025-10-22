import { DataTypes, Model } from 'sequelize';

export class InformeLaborales extends Model {}

export const initInformeLaborales = (sequelize) => {
  InformeLaborales.init(
    {
      informeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'informe_id',
        references: { model: 'informes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seEncuentraLaborando: { type: DataTypes.TEXT, allowNull: true, field: 'se_encuentra_laborando' },
      sostenEconomico: { type: DataTypes.TEXT, allowNull: true, field: 'sosten_economico' },
      ingresoAproximado: { type: DataTypes.TEXT, allowNull: true, field: 'ingreso_aproximado' },
      comentarioGeneral: { type: DataTypes.TEXT, allowNull: true, field: 'comentario_general' },
      empresas: { type: DataTypes.JSONB, allowNull: true }
    },
    {
      sequelize,
      tableName: 'informes_laborales',
      modelName: 'InformeLaborales',
      underscored: true,
      timestamps: false
    }
  );
  return InformeLaborales;
};
