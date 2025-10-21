import { DataTypes, Model } from 'sequelize';

export class PostulantePersonales extends Model {}

export const initPostulantePersonales = (sequelize) => {
  PostulantePersonales.init(
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
      nombre: { type: DataTypes.STRING(150), allowNull: true },
      telefono: { type: DataTypes.STRING(25), allowNull: true },
      tiempoConocerlo: { type: DataTypes.STRING(100), allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_personales',
      modelName: 'PostulantePersonales'
    }
  );
  return PostulantePersonales;
};
