import { DataTypes } from "sequelize";
import db from "../db/connection";
import Quirofano from "./quirofano";
import Tipo_Procedimientos from './tipoProcedimiento';
import Catalogo_Procedimientos from "./CatalogoProcedimiento";
import Catalogo_Forma_Pago from "./formaPago";
import Catalogo_Banco from "./banco";

const Procedimientos = db.define('Procedimientos', {
    serie: {
        type: DataTypes.STRING
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
    },
    costo: {
        type: DataTypes.DECIMAL
    },
    id_banco: {
        type: DataTypes.TINYINT
    },
    id_forma_pago:{
        type: DataTypes.TINYINT
    }
},
{
    freezeTableName: true,
    tableName: 'procedimientos'
}
);

Procedimientos.belongsTo( Quirofano, { foreignKey: 'id_quirofano'} );
Procedimientos.hasOne( Catalogo_Procedimientos, { foreignKey: 'id_procedimiento', sourceKey: 'id_procedimiento' });
Procedimientos.hasOne( Catalogo_Forma_Pago, { foreignKey: 'id_forma_pago', sourceKey: 'id_forma_pago' });
Procedimientos.hasOne( Catalogo_Banco, { foreignKey: 'id_banco', sourceKey: 'id_banco' });


export default Procedimientos;