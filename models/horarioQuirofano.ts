import { DataTypes } from "sequelize";
import db from "../db/connection";

const HorariosQuirofanos = db.define('Horarios_Quirofanos', {
    id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_quirofano: {
        type: DataTypes.STRING
    },
    hora: {
        type: DataTypes.INTEGER
    },
    minuntos: {
        type: DataTypes.INTEGER
    }
});

export default HorariosQuirofanos;
