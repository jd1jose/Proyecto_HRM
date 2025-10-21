import { DataTypes, Model } from 'sequelize';

export class PostulanteLaborales extends Model {}

export const initPostulanteLaborales = (sequelize) => {
  PostulanteLaborales.init(
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
      empresaNombre: { type: DataTypes.STRING(200), allowNull: true },
      empresaDireccion: { type: DataTypes.STRING(220), allowNull: true },
      empresaTelefono: { type: DataTypes.STRING(25), allowNull: true },
      puestoDesempenado: { type: DataTypes.STRING(150), allowNull: true },
      salarioDevengado: { type: DataTypes.STRING(80), allowNull: true },
      fechaIngreso: { type: DataTypes.DATEONLY, allowNull: true },
      fechaSalida: { type: DataTypes.DATEONLY, allowNull: true },
      funciones: { type: DataTypes.TEXT, allowNull: true },
      jefeNombre: { type: DataTypes.STRING(150), allowNull: true },
      jefePuesto: { type: DataTypes.STRING(150), allowNull: true },
      motivoRetiro: { type: DataTypes.TEXT, allowNull: true },
      sePuedeReferenciar: { type: DataTypes.BOOLEAN, allowNull: true }
    },
    {
      sequelize,
      tableName: 'postulantes_laborales',
      modelName: 'PostulanteLaborales'
    }
  );
  return PostulanteLaborales;
};
