import { DataTypes } from "sequelize";
import db from "../db/connection";

const Consultorio = db.define('Consultorio', {
    id_consultorio: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion_consultorio: {
        type: DataTypes.STRING
    },
    id_edificio: {
        type: DataTypes.TINYINT
    }
},
{
    freezeTableName: true,
    tableName: 'consultorios'
}
);

export default Consultorio;