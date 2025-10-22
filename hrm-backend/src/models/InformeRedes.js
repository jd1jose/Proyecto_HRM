import { DataTypes, Model } from 'sequelize';

export class InformeRedes extends Model {}

export const initInformeRedes = (sequelize) => {
  InformeRedes.init(
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
      usaRedesSociales: { type: DataTypes.TEXT, allowNull: true, field: 'usa_redes_sociales' },
      dejaActividadesPorRedes: { type: DataTypes.TEXT, allowNull: true, field: 'deja_actividades_por_redes' },
      horaMasActiva: { type: DataTypes.TEXT, allowNull: true, field: 'hora_mas_activa' },
      revisaAntesDormir: { type: DataTypes.TEXT, allowNull: true, field: 'revisa_antes_dormir' },
      tiempoEnRedes: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_en_redes' },
      tiempoChatAmigos: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_chat_amigos' },
      tiempoChatFamiliares: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_chat_familiares' },
      tiempoPlaticaPareja: { type: DataTypes.TEXT, allowNull: true, field: 'tiempo_platica_pareja' },
      haDejadoRedes: { type: DataTypes.TEXT, allowNull: true, field: 'ha_dejado_redes' },
      tipoContenido: { type: DataTypes.TEXT, allowNull: true, field: 'tipo_contenido' },
      capturaPerfil: { type: DataTypes.TEXT, allowNull: true, field: 'captura_perfil' }
    },
    {
      sequelize,
      tableName: 'informes_redes',
      modelName: 'InformeRedes',
      underscored: true,
      timestamps: false
    }
  );
  return InformeRedes;
};
