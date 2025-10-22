import { DataTypes, Model } from 'sequelize';

export class InformeEntrevista extends Model {}

export const initInformeEntrevista = (sequelize) => {
  InformeEntrevista.init(
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
      presentacionHora: { type: DataTypes.TEXT, allowNull: true, field: 'presentacion_hora' },
      comentarioPresentacion: { type: DataTypes.TEXT, allowNull: true, field: 'comentario_presentacion' },
      vestimentaAdecuada: { type: DataTypes.TEXT, allowNull: true, field: 'vestimenta_adecuada' },
      desarrolloVerbal: { type: DataTypes.TEXT, allowNull: true, field: 'desarrollo_verbal' },
      objetivoCortoPersonal: { type: DataTypes.TEXT, allowNull: true, field: 'objetivo_corto_personal' },
      objetivoMedianoPersonal: { type: DataTypes.TEXT, allowNull: true, field: 'objetivo_mediano_personal' },
      objetivoLargoPersonal: { type: DataTypes.TEXT, allowNull: true, field: 'objetivo_largo_personal' },
      objetivoCortoLaboral: { type: DataTypes.TEXT, allowNull: true, field: 'objetivo_corto_laboral' },
      objetivoMedianoLaboral: { type: DataTypes.TEXT, allowNull: true, field: 'objetivo_mediano_laboral' },
      objetivoLargoLaboral: { type: DataTypes.TEXT, allowNull: true, field: 'objetivo_largo_laboral' },
      esperaEmpresa: { type: DataTypes.TEXT, allowNull: true, field: 'espera_empresa' },
      tieneFamiliares: { type: DataTypes.TEXT, allowNull: true, field: 'tiene_familiares' },
      presentoDocumentacion: { type: DataTypes.TEXT, allowNull: true, field: 'presento_documentacion' },
      careceAntecedentes: { type: DataTypes.TEXT, allowNull: true, field: 'carece_antecedentes' },
      alteracionesDocumentacion: { type: DataTypes.TEXT, allowNull: true, field: 'alteraciones_documentacion' }
    },
    {
      sequelize,
      tableName: 'informes_entrevista',
      modelName: 'InformeEntrevista',
      underscored: true,
      timestamps: false
    }
  );
  return InformeEntrevista;
};
