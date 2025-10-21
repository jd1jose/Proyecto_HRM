import { DataTypes, Model } from 'sequelize';

export class PostulanteAcademicos extends Model {}

export const initPostulanteAcademicos = (sequelize) => {
  PostulanteAcademicos.init(
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
      primariaEstablecimiento: { type: DataTypes.STRING(200), allowNull: true },
      primariaAnios: { type: DataTypes.STRING(60), allowNull: true },
      basicosEstablecimiento: { type: DataTypes.STRING(200), allowNull: true },
      basicosAnios: { type: DataTypes.STRING(60), allowNull: true },
      diversificadoEstablecimiento: { type: DataTypes.STRING(200), allowNull: true },
      diversificadoCarrera: { type: DataTypes.STRING(150), allowNull: true },
      diversificadoAnios: { type: DataTypes.STRING(60), allowNull: true },
      tecnicaEstablecimiento: { type: DataTypes.STRING(200), allowNull: true },
      tecnicaCarrera: { type: DataTypes.STRING(150), allowNull: true },
      tecnicaAnios: { type: DataTypes.STRING(60), allowNull: true },
      universidadCuenta: { type: DataTypes.BOOLEAN, allowNull: true },
      universidadDetalle: { type: DataTypes.TEXT, allowNull: true },
      postgradoCuenta: { type: DataTypes.BOOLEAN, allowNull: true },
      postgradoDetalle: { type: DataTypes.TEXT, allowNull: true },
      idiomas: { type: DataTypes.TEXT, allowNull: true },
      software: { type: DataTypes.TEXT, allowNull: true },
      maquinas: { type: DataTypes.TEXT, allowNull: true },
      otrasFunciones: { type: DataTypes.TEXT, allowNull: true },
      experienciaLaboral: { type: DataTypes.BOOLEAN, allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_academicos',
      modelName: 'PostulanteAcademicos'
    }
  );
  return PostulanteAcademicos;
};
