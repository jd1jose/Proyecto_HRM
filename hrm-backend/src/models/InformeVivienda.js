import { DataTypes, Model } from 'sequelize';

export class InformeVivienda extends Model {}

export const initInformeVivienda = (sequelize) => {
  InformeVivienda.init(
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
      tipoDomicilio: { type: DataTypes.TEXT, allowNull: true, field: 'tipo_domicilio' },
      ubicacion: { type: DataTypes.TEXT, allowNull: true },
      serviciosBasicos: { type: DataTypes.TEXT, allowNull: true, field: 'servicios_basicos' },
      residencia: { type: DataTypes.TEXT, allowNull: true },
      propietarioNombre: { type: DataTypes.TEXT, allowNull: true, field: 'propietario_nombre' },
      parentescoPropietario: { type: DataTypes.TEXT, allowNull: true, field: 'parentesco_propietario' },
      clasificacionPoblacion: { type: DataTypes.TEXT, allowNull: true, field: 'clasificacion_poblacion' },
      colorFachada: { type: DataTypes.TEXT, allowNull: true, field: 'color_fachada' },
      colorPuertas: { type: DataTypes.TEXT, allowNull: true, field: 'color_puertas' },
      caracteristicasDomicilio: { type: DataTypes.TEXT, allowNull: true, field: 'caracteristicas_domicilio' },
      habitacionesDormir: { type: DataTypes.TEXT, allowNull: true, field: 'habitaciones_dormir' },
      ambientesTotales: { type: DataTypes.TEXT, allowNull: true, field: 'ambientes_totales' },
      estadoDomicilio: { type: DataTypes.TEXT, allowNull: true, field: 'estado_domicilio' },
      tipoConstruccion: { type: DataTypes.TEXT, allowNull: true, field: 'tipo_construccion' },
      materialTecho: { type: DataTypes.TEXT, allowNull: true, field: 'material_techo' },
      materialPiso: { type: DataTypes.TEXT, allowNull: true, field: 'material_piso' },
      nivelesDomicilio: { type: DataTypes.TEXT, allowNull: true, field: 'niveles_domicilio' },
      parqueDomicilio: { type: DataTypes.TEXT, allowNull: true, field: 'parque_domicilio' },
      tamanoPropiedad: { type: DataTypes.TEXT, allowNull: true, field: 'tamano_propiedad' },
      television: { type: DataTypes.TEXT, allowNull: true },
      cantidadTelevisores: { type: DataTypes.TEXT, allowNull: true, field: 'cantidad_televisores' },
      servicioCable: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_cable' },
      internet: { type: DataTypes.TEXT, allowNull: true },
      computadora: { type: DataTypes.TEXT, allowNull: true },
      cantidadComputadoras: { type: DataTypes.TEXT, allowNull: true, field: 'cantidad_computadoras' },
      equipoSonido: { type: DataTypes.TEXT, allowNull: true, field: 'equipo_sonido' },
      microondas: { type: DataTypes.TEXT, allowNull: true },
      refrigerador: { type: DataTypes.TEXT, allowNull: true },
      estufa: { type: DataTypes.TEXT, allowNull: true },
      tiempoVivir: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_vivir' },
      habitantesTotales: { type: DataTypes.TEXT, allowNull: true, field: 'habitantes_totales' },
      distanciaTrabajo: { type: DataTypes.TEXT, allowNull: true, field: 'distancia_trabajo' },
      tiempoTraslado: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_traslado' },
      medioTransporte: { type: DataTypes.TEXT, allowNull: true, field: 'medio_transporte' },
      habitantesVivienda: { type: DataTypes.JSONB, allowNull: true, field: 'habitantes_vivienda' },
      sistemaAguaPotable: { type: DataTypes.TEXT, allowNull: true, field: 'sistema_agua_potable' },
      sistemaAlcantarilladoAguasServidas: { type: DataTypes.TEXT, allowNull: true, field: 'sistema_alcantarillado_aguas_servidas' },
      sistemaDesaguePluvialesDrenajes: { type: DataTypes.TEXT, allowNull: true, field: 'sistema_desague_pluviales_drenajes' },
      sistemaAlumbradoPublico: { type: DataTypes.TEXT, allowNull: true, field: 'sistema_alumbrado_publico' },
      servicioEnergiaElectrica: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_energia_electrica' },
      servicioRecoleccionBasura: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_recoleccion_basura' },
      servicioGasPropano: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_gas_propano' },
      servicioSeguridadPublica: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_seguridad_publica' },
      servicioAsistenciaMedica: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_asistencia_medica' },
      establecimientosEducativos: { type: DataTypes.TEXT, allowNull: true, field: 'establecimientos_educativos' },
      servicioTransportePublico: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_transporte_publico' },
      servicioTelecomunicacionesTelefoniaPublica: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_telecomunicaciones_telefonia_publica' },
      pavimentacion: { type: DataTypes.TEXT, allowNull: true },
      servicioVigilanciaPrivada: { type: DataTypes.TEXT, allowNull: true, field: 'servicio_vigilancia_privada' },
      existeVandalismoZona: { type: DataTypes.TEXT, allowNull: true, field: 'existe_vandalismo_zona' },
      hayFarmacoDependencia: { type: DataTypes.TEXT, allowNull: true, field: 'hay_farmaco_dependencia' },
      zonaConsideradaRoja: { type: DataTypes.TEXT, allowNull: true, field: 'zona_considerada_roja' },
      zonaAltaDensidadPoblacion: { type: DataTypes.TEXT, allowNull: true, field: 'zona_alta_densidad_poblacion' },
      haSidoVictimaDelitoDomicilio: { type: DataTypes.TEXT, allowNull: true, field: 'ha_sido_victima_delito_domicilio' },
      claseSocialZona: { type: DataTypes.TEXT, allowNull: true, field: 'clase_social_zona' },
      nivelPeligrosidad: { type: DataTypes.TEXT, allowNull: true, field: 'nivel_peligrosidad' },
      referenciasVecinos: { type: DataTypes.TEXT, allowNull: true, field: 'referencias_vecinos' }
    },
    {
      sequelize,
      tableName: 'informes_vivienda',
      modelName: 'InformeVivienda',
      underscored: true,
      timestamps: false
    }
  );
  return InformeVivienda;
};
