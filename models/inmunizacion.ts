import { DataTypes } from "sequelize";
import db from "../db/connection";

const Inmunizacion = db.define('Inmunizaciones', {
    id_inmunizacion: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion_inmunizacion: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
},
{
    freezeTableName: true,
    tableName: 'inmunizaciones'
});

export default Inmunizacion; 