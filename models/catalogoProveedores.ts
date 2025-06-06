import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Proveedores = db.define('Catalogo_Proveedores', {
    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_proveedor: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_proveedores'
}
);


export default Catalogo_Proveedores;