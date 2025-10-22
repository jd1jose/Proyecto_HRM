import { DataTypes, Model } from 'sequelize';

export class InformeReferencias extends Model {}

export const initInformeReferencias = (sequelize) => {
  InformeReferencias.init(
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
      referenciasPersonales: { type: DataTypes.JSONB, allowNull: true, field: 'referencias_personales' },
      referenciasFamiliares: { type: DataTypes.JSONB, allowNull: true, field: 'referencias_familiares' },
      referenciasVecindario: { type: DataTypes.JSONB, allowNull: true, field: 'referencias_vecindario' }
    },
    {
      sequelize,
      tableName: 'informes_referencias',
      modelName: 'InformeReferencias',
      underscored: true,
      timestamps: false
    }
  );
  return InformeReferencias;
};
