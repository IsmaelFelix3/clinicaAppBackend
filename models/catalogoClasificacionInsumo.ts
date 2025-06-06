import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Clasificacion_Insumo = db.define('Catalogo_Clasificacion_Insumo', {
    id_clasificacion: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_clasificacion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_clasificacion_insumos'
}
);

export default Catalogo_Clasificacion_Insumo;