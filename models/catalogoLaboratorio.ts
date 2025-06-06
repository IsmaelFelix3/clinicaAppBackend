import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Laboratorio = db.define('Catalogo_Laboratorio', {
    id_laboratorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_laboratorio: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_laboratorios'
}
);


export default Catalogo_Laboratorio;