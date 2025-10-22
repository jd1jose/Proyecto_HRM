import { DataTypes, Model } from 'sequelize';

export class InformeGenerales extends Model {}

export const initInformeGenerales = (sequelize) => {
  InformeGenerales.init(
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
      nombreCompleto: { type: DataTypes.TEXT, allowNull: true, field: 'nombre_completo' },
      direccion: { type: DataTypes.TEXT, allowNull: true },
      sexo: { type: DataTypes.TEXT, allowNull: true },
      edad: { type: DataTypes.TEXT, allowNull: true },
      fechaNacimiento: { type: DataTypes.TEXT, allowNull: true, field: 'fecha_nacimiento' },
      lugarNacimiento: { type: DataTypes.TEXT, allowNull: true, field: 'lugar_nacimiento' },
      cui: { type: DataTypes.TEXT, allowNull: true },
      extendida: { type: DataTypes.TEXT, allowNull: true },
      estadoCivil: { type: DataTypes.TEXT, allowNull: true, field: 'estado_civil' },
      licenciaConducir: { type: DataTypes.TEXT, allowNull: true, field: 'licencia_conducir' },
      licenciaTipo: { type: DataTypes.TEXT, allowNull: true, field: 'licencia_tipo' },
      licenciaNumero: { type: DataTypes.TEXT, allowNull: true, field: 'licencia_numero' },
      licenciaVigencia: { type: DataTypes.TEXT, allowNull: true, field: 'licencia_vigencia' },
      numeroDocumento: { type: DataTypes.TEXT, allowNull: true, field: 'numero_documento' },
      nit: { type: DataTypes.TEXT, allowNull: true },
      igss: { type: DataTypes.TEXT, allowNull: true },
      irtra: { type: DataTypes.TEXT, allowNull: true },
      pasaporte: { type: DataTypes.TEXT, allowNull: true },
      visaAmericana: { type: DataTypes.TEXT, allowNull: true, field: 'visa_americana' },
      telCasa: { type: DataTypes.TEXT, allowNull: true, field: 'tel_casa' },
      telCelular: { type: DataTypes.TEXT, allowNull: true, field: 'tel_celular' },
      telEmergencia: { type: DataTypes.TEXT, allowNull: true, field: 'tel_emergencia' },
      contactoEmergencia: { type: DataTypes.TEXT, allowNull: true, field: 'contacto_emergencia' },
      parentesco: { type: DataTypes.TEXT, allowNull: true },
      email: { type: DataTypes.TEXT, allowNull: true },
      trabajaActualmente: { type: DataTypes.TEXT, allowNull: true, field: 'trabaja_actualmente' },
      empresa: { type: DataTypes.TEXT, allowNull: true },
      empresaSolicitante: { type: DataTypes.TEXT, allowNull: true, field: 'empresa_solicitante' },
      laboraParaLaEmpresa: { type: DataTypes.TEXT, allowNull: true, field: 'labora_para_la_empresa' },
      puestoAplica: { type: DataTypes.TEXT, allowNull: true, field: 'puesto_aplica' },
      medioTransporte: { type: DataTypes.TEXT, allowNull: true, field: 'medio_transporte' },
      religion: { type: DataTypes.TEXT, allowNull: true },
      tipoSangre: { type: DataTypes.TEXT, allowNull: true, field: 'tipo_sangre' },
      estatura: { type: DataTypes.TEXT, allowNull: true },
      peso: { type: DataTypes.TEXT, allowNull: true },
      cicatrices: { type: DataTypes.TEXT, allowNull: true },
      cabello: { type: DataTypes.TEXT, allowNull: true },
      tipoCabello: { type: DataTypes.TEXT, allowNull: true, field: 'tipo_cabello' },
      apodo: { type: DataTypes.TEXT, allowNull: true },
      profesion: { type: DataTypes.TEXT, allowNull: true },
      pretension: { type: DataTypes.TEXT, allowNull: true },
      comentarios: { type: DataTypes.TEXT, allowNull: true }
    },
    {
      sequelize,
      tableName: 'informes_generales',
      modelName: 'InformeGenerales',
      underscored: true,
      timestamps: false
    }
  );
  return InformeGenerales;
};
