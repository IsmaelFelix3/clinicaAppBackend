import { DataTypes } from "sequelize";
import db from "../db/connection";

const Otras_Enfermedades = db.define('Otras_Enfermedades', {
    id_otras_enfermedades: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion_otras_enfermedades: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
},
{
    freezeTableName: true,
    tableName: 'otras_enfermedades'
});

export default Otras_Enfermedades;