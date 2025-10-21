import { DataTypes, Model } from 'sequelize';

export class PostulanteFamiliares extends Model {}

export const initPostulanteFamiliares = (sequelize) => {
  PostulanteFamiliares.init(
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
      padreNombre: { type: DataTypes.STRING(150), allowNull: true },
      padreEdad: { type: DataTypes.INTEGER, allowNull: true },
      padreVive: { type: DataTypes.BOOLEAN, allowNull: true },
      padreViveConUsted: { type: DataTypes.BOOLEAN, allowNull: true },
      madreNombre: { type: DataTypes.STRING(150), allowNull: true },
      madreEdad: { type: DataTypes.INTEGER, allowNull: true },
      madreVive: { type: DataTypes.BOOLEAN, allowNull: true },
      madreViveConUsted: { type: DataTypes.BOOLEAN, allowNull: true },
      conyugeNombre: { type: DataTypes.STRING(150), allowNull: true },
      conyugeEdad: { type: DataTypes.INTEGER, allowNull: true },
      conyugeVive: { type: DataTypes.BOOLEAN, allowNull: true },
      conyugeViveConUsted: { type: DataTypes.BOOLEAN, allowNull: true },
      conyugeOcupacion: { type: DataTypes.STRING(150), allowNull: true },
      hijosNombre: { type: DataTypes.STRING(150), allowNull: true },
      hijosEdad: { type: DataTypes.INTEGER, allowNull: true },
      hermanosNombre: { type: DataTypes.STRING(150), allowNull: true },
      hermanosEdad: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_familiares',
      modelName: 'PostulanteFamiliares'
    }
  );
  return PostulanteFamiliares;
};
