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
    }
},
{
    initialAutoIncrement: '1000'
}
);

export default Insumo;
