import { DataTypes } from "sequelize";
import db from "../db/connection";
import Quirofano from "./quirofano";
import Tipo_Procedimientos from './tipoProcedimiento';
import Catalogo_Procedimientos from "./CatalogoProcedimiento";

const Procedimientos = db.define('Procedimientos', {
    serie: {
        type: DataTypes.STRING,
        defaultValue: 'PC-PRM'
    },
    id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_medico: {
        type: DataTypes.INTEGER
    },
    id_paciente: {
        type: DataTypes.INTEGER
    },
    id_quirofano: {
        type: DataTypes.INTEGER
    },
    fecha_procedimiento_inicio: {
        type: DataTypes.DATE
    },
    fecha_procedimiento_fin: {
        type: DataTypes.DATE
    },
    id_procedimiento: {
        type: DataTypes.SMALLINT
    },
    estatus:{
        type: DataTypes.STRING
    },
    detalles:{
        type: DataTypes.TEXT
    }
},
{
    freezeTableName: true,
    tableName: 'procedimientos'
}
);

Procedimientos.belongsTo( Quirofano, { foreignKey: 'id_quirofano'} );
Procedimientos.hasOne( Catalogo_Procedimientos, { foreignKey: 'id_procedimiento', sourceKey: 'id_procedimiento' });

export default Procedimientos;