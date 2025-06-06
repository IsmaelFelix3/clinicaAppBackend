import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Tasa_Impuesto = db.define('Catalogo_Tasa_Impuesto', {
    id_tasa_impuesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identificador_fiscal: {
        type: DataTypes.STRING
    },
    nombre_tasa: {
        type: DataTypes.STRING
    },
    tipo_tasa: {
        type: DataTypes.STRING
    },
    tipo_monto: {
        type: DataTypes.STRING
    },
    monto: {
        type: DataTypes.DECIMAL
    },
    incluirEnPrecio: {
        type: DataTypes.BOOLEAN
    },
    esRetencion: {
        type: DataTypes.BOOLEAN
    },
    etiquetaFactura: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_tasa_impuestos'
}
);


export default Catalogo_Tasa_Impuesto;