import { DataTypes, Model } from 'sequelize';

export class Postulante extends Model {}

export const initPostulante = (sequelize) => {
  Postulante.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombreCompleto: { type: DataTypes.STRING(200), allowNull: true },
      puestoSolicita: { type: DataTypes.STRING(150), allowNull: true },
      pretensionSalarial: { type: DataTypes.STRING(100), allowNull: true },
      profesion: { type: DataTypes.STRING(150), allowNull: true },
      lugarNacimiento: { type: DataTypes.STRING(150), allowNull: true },
      fechaNacimiento: { type: DataTypes.DATEONLY, allowNull: true },
      edadActual: { type: DataTypes.INTEGER, allowNull: true },
      estatura: { type: DataTypes.STRING(20), allowNull: true },
      grupoSanguineo: { type: DataTypes.STRING(8), allowNull: true },
      direccionCompleta: { type: DataTypes.STRING(300), allowNull: true },
      telefonoContacto: { type: DataTypes.STRING(25), allowNull: true },
      contactoEmergencia: { type: DataTypes.TEXT, allowNull: true },
      estadoCivil: { type: DataTypes.STRING(40), allowNull: true },
      viveCon: { type: DataTypes.STRING(150), allowNull: true },
      dependientes: { type: DataTypes.STRING(150), allowNull: true },
      dpi: { type: DataTypes.STRING(30), allowNull: true },
      nit: { type: DataTypes.STRING(30), allowNull: true },
      igss: { type: DataTypes.STRING(30), allowNull: true },
      irtra: { type: DataTypes.STRING(30), allowNull: true },
      licenciaTipo: { type: DataTypes.STRING(60), allowNull: true },
      documentoTrabajo: { type: DataTypes.STRING(150), allowNull: true },
      medioTransporte: { type: DataTypes.TEXT, allowNull: true },
      estado: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'activo' }
    },
    {
      sequelize,
      tableName: 'postulantes',
      modelName: 'Postulante'
    }
  );
  return Postulante;
};

