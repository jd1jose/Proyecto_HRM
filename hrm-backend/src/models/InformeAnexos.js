import { DataTypes, Model } from 'sequelize';

export class InformeAnexos extends Model {}

export const initInformeAnexos = (sequelize) => {
  InformeAnexos.init(
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
      vivienda: { type: DataTypes.JSONB, allowNull: true },
      dpi: { type: DataTypes.JSONB, allowNull: true },
      rtu: { type: DataTypes.JSONB, allowNull: true },
      cgc: { type: DataTypes.JSONB, allowNull: true },
      mspas: { type: DataTypes.JSONB, allowNull: true },
      recede: { type: DataTypes.JSONB, allowNull: true },
      migracion: { type: DataTypes.JSONB, allowNull: true },
      renas: { type: DataTypes.JSONB, allowNull: true },
      antecedentes: { type: DataTypes.JSONB, allowNull: true }
    },
    {
      sequelize,
      tableName: 'informes_anexos',
      modelName: 'InformeAnexos',
      underscored: true,
      timestamps: false
    }
  );
  return InformeAnexos;
};
