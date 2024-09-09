import { DataTypes } from "sequelize";
import db from "../db/connection";

const Insumo = db.define('Insumos', {
    id_insumo: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    facturaCompra: {
        type: DataTypes.STRING
    },
    perecedero: {
        type: DataTypes.BOOLEAN
    },
    numeroLote: {
        type: DataTypes.STRING
    },
    fechaCaducidad: {
        type: DataTypes.DATE
    },
    cantidadMinima: {
        type: DataTypes.NUMBER
    },
    cantidadMaxima: {
        type: DataTypes.NUMBER
    },
    cantidadActual: {
        type: DataTypes.NUMBER
    }
},
{
    initialAutoIncrement: '1000'
}
);

export default Insumo;
