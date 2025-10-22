import { DataTypes, Model } from 'sequelize';

export class InformeFamiliares extends Model {}

export const initInformeFamiliares = (sequelize) => {
  InformeFamiliares.init(
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
      nombrePadre: { type: DataTypes.TEXT, allowNull: true, field: 'nombre_padre' },
      edadPadre: { type: DataTypes.TEXT, allowNull: true, field: 'edad_padre' },
      fechaNacimientoPadre: { type: DataTypes.TEXT, allowNull: true, field: 'fecha_nacimiento_padre' },
      originarioPadre: { type: DataTypes.TEXT, allowNull: true, field: 'originario_padre' },
      vivePadre: { type: DataTypes.TEXT, allowNull: true, field: 'vive_padre' },
      viveConPadre: { type: DataTypes.TEXT, allowNull: true, field: 'vive_con_padre' },
      escolaridadPadre: { type: DataTypes.TEXT, allowNull: true, field: 'escolaridad_padre' },
      profesionPadre: { type: DataTypes.TEXT, allowNull: true, field: 'profesion_padre' },
      residenciaPadre: { type: DataTypes.TEXT, allowNull: true, field: 'residencia_padre' },
      nombreMadre: { type: DataTypes.TEXT, allowNull: true, field: 'nombre_madre' },
      edadMadre: { type: DataTypes.TEXT, allowNull: true, field: 'edad_madre' },
      fechaNacimientoMadre: { type: DataTypes.TEXT, allowNull: true, field: 'fecha_nacimiento_madre' },
      originarioMadre: { type: DataTypes.TEXT, allowNull: true, field: 'originario_madre' },
      viveMadre: { type: DataTypes.TEXT, allowNull: true, field: 'vive_madre' },
      viveConMadre: { type: DataTypes.TEXT, allowNull: true, field: 'vive_con_madre' },
      escolaridadMadre: { type: DataTypes.TEXT, allowNull: true, field: 'escolaridad_madre' },
      profesionMadre: { type: DataTypes.TEXT, allowNull: true, field: 'profesion_madre' },
      residenciaMadre: { type: DataTypes.TEXT, allowNull: true, field: 'residencia_madre' },
      resideEnPareja: { type: DataTypes.TEXT, allowNull: true, field: 'reside_en_pareja' },
      nombrePareja: { type: DataTypes.TEXT, allowNull: true, field: 'nombre_pareja' },
      edadPareja: { type: DataTypes.TEXT, allowNull: true, field: 'edad_pareja' },
      fechaNacimientoPareja: { type: DataTypes.TEXT, allowNull: true, field: 'fecha_nacimiento_pareja' },
      originarioPareja: { type: DataTypes.TEXT, allowNull: true, field: 'originario_pareja' },
      vivenJuntos: { type: DataTypes.TEXT, allowNull: true, field: 'viven_juntos' },
      tiempoRelacion: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_relacion' },
      escolaridadPareja: { type: DataTypes.TEXT, allowNull: true, field: 'escolaridad_pareja' },
      profesionPareja: { type: DataTypes.TEXT, allowNull: true, field: 'profesion_pareja' },
      residenciaPareja: { type: DataTypes.TEXT, allowNull: true, field: 'residencia_pareja' },
      comentarios: { type: DataTypes.TEXT, allowNull: true },
      hermanos: { type: DataTypes.JSONB, allowNull: true },
      hijos: { type: DataTypes.JSONB, allowNull: true }
    },
    {
      sequelize,
      tableName: 'informes_familiares',
      modelName: 'InformeFamiliares',
      underscored: true,
      timestamps: false
    }
  );
  return InformeFamiliares;
};
