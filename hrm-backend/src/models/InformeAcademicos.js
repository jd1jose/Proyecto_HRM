import { DataTypes, Model } from 'sequelize';

export class InformeAcademicos extends Model {}

export const initInformeAcademicos = (sequelize) => {
  InformeAcademicos.init(
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
      universitario: { type: DataTypes.JSONB, allowNull: true },
      diversificado: { type: DataTypes.JSONB, allowNull: true },
      primaria: { type: DataTypes.JSONB, allowNull: true },
      tecnico: { type: DataTypes.JSONB, allowNull: true },
      conocimientosGenerales: { type: DataTypes.JSONB, allowNull: true, field: 'conocimientos_generales' }
    },
    {
      sequelize,
      tableName: 'informes_academicos',
      modelName: 'InformeAcademicos',
      underscored: true,
      timestamps: false
    }
  );
  return InformeAcademicos;
};
