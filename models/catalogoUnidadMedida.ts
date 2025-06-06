import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Unidad_Medida = db.define('Catalogo_Unidad_Medida', {
    id_unidad_medidas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    unidad_medida: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_unidad_medidas'
}
);


export default Catalogo_Unidad_Medida;