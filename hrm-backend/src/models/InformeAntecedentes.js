import { DataTypes, Model } from 'sequelize';

export class InformeAntecedentes extends Model {}

export const initInformeAntecedentes = (sequelize) => {
  InformeAntecedentes.init(
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
      deshonestidad: { type: DataTypes.TEXT, allowNull: true },
      mentidoEmpleo: { type: DataTypes.TEXT, allowNull: true, field: 'mentido_empleo' },
      beneficioIlicito: { type: DataTypes.TEXT, allowNull: true, field: 'beneficio_ilicito' },
      usoIndebidoInfo: { type: DataTypes.TEXT, allowNull: true, field: 'uso_indebido_info' },
      usoSuministros: { type: DataTypes.TEXT, allowNull: true, field: 'uso_suministros' },
      problemasLaborales: { type: DataTypes.TEXT, allowNull: true, field: 'problemas_laborales' },
      discusionesSuperiores: { type: DataTypes.TEXT, allowNull: true, field: 'discusiones_superiores' },
      actaAdministrativa: { type: DataTypes.TEXT, allowNull: true, field: 'acta_administrativa' },
      sobornos: { type: DataTypes.TEXT, allowNull: true },
      conoceDelincuentes: { type: DataTypes.TEXT, allowNull: true, field: 'conoce_delincuentes' },
      miembroSindicato: { type: DataTypes.TEXT, allowNull: true, field: 'miembro_sindicato' },
      asociadoGrupos: { type: DataTypes.TEXT, allowNull: true, field: 'asociado_grupos' },
      beneficiadoIlicito: { type: DataTypes.TEXT, allowNull: true, field: 'beneficiado_ilicito' },
      amistadGrupos: { type: DataTypes.TEXT, allowNull: true, field: 'amistad_grupos' },
      amistadAntecedentes: { type: DataTypes.TEXT, allowNull: true, field: 'amistad_antecedentes' },
      familiaProblemasLegales: { type: DataTypes.TEXT, allowNull: true, field: 'familia_problemas_legales' },
      efectivoCargo: { type: DataTypes.TEXT, allowNull: true, field: 'efectivo_cargo' },
      sobrantesFaltantes: { type: DataTypes.TEXT, allowNull: true, field: 'sobrantes_faltantes' },
      autoPrestamos: { type: DataTypes.TEXT, allowNull: true, field: 'auto_prestamos' },
      jineteoEfectivo: { type: DataTypes.TEXT, allowNull: true, field: 'jineteo_efectivo' },
      familiarDetenido: { type: DataTypes.TEXT, allowNull: true, field: 'familiar_detenido' },
      cargosCometida: { type: DataTypes.TEXT, allowNull: true, field: 'cargos_cometida' },
      ayudadoIlicito: { type: DataTypes.TEXT, allowNull: true, field: 'ayudado_ilicito' },
      ocultaInfo: { type: DataTypes.TEXT, allowNull: true, field: 'oculta_info' },
      actividadIlicita: { type: DataTypes.TEXT, allowNull: true, field: 'actividad_ilicita' },
      mintioInformacion: { type: DataTypes.TEXT, allowNull: true, field: 'mintio_informacion' },
      roboSuperior100: { type: DataTypes.TEXT, allowNull: true, field: 'robo_superior100' },
      tomadoProductos: { type: DataTypes.TEXT, allowNull: true, field: 'tomado_productos' },
      regalosValor: { type: DataTypes.TEXT, allowNull: true, field: 'regalos_valor' },
      despedidoRobo: { type: DataTypes.TEXT, allowNull: true, field: 'despedido_robo' },
      conoceDroga: { type: DataTypes.TEXT, allowNull: true, field: 'conoce_droga' },
      consumeDrogas: { type: DataTypes.TEXT, allowNull: true, field: 'consume_drogas' },
      vidaDrogas: { type: DataTypes.TEXT, allowNull: true, field: 'vida_drogas' },
      trabajoDrogas: { type: DataTypes.TEXT, allowNull: true, field: 'trabajo_drogas' },
      divulgaInfo: { type: DataTypes.TEXT, allowNull: true, field: 'divulga_info' },
      tarjetaCredito: { type: DataTypes.TEXT, allowNull: true, field: 'tarjeta_credito' },
      falsificadoDocumentos: { type: DataTypes.TEXT, allowNull: true, field: 'falsificado_documentos' },
      fraudeExtorsion: { type: DataTypes.TEXT, allowNull: true, field: 'fraude_extorsion' },
      actoInmoral: { type: DataTypes.TEXT, allowNull: true, field: 'acto_inmoral' },
      relacionLaboral: { type: DataTypes.TEXT, allowNull: true, field: 'relacion_laboral' },
      tramitesNoAutorizados: { type: DataTypes.TEXT, allowNull: true, field: 'tramites_no_autorizados' },
      problemasPersonales: { type: DataTypes.TEXT, allowNull: true, field: 'problemas_personales' },
      atentadoVidaPropia: { type: DataTypes.TEXT, allowNull: true, field: 'atentado_vida_propia' },
      atentadoVidaOtros: { type: DataTypes.TEXT, allowNull: true, field: 'atentado_vida_otros' },
      ebriedadTrabajo: { type: DataTypes.TEXT, allowNull: true, field: 'ebriedad_trabajo' },
      estupefacientesTrabajo: { type: DataTypes.TEXT, allowNull: true, field: 'estupefacientes_trabajo' },
      deudasEconomicas: { type: DataTypes.TEXT, allowNull: true, field: 'deudas_economicas' }
    },
    {
      sequelize,
      tableName: 'informes_antecedentes',
      modelName: 'InformeAntecedentes',
      underscored: true,
      timestamps: false
    }
  );
  return InformeAntecedentes;
};
