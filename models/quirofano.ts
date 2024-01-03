import { DataTypes } from "sequelize";
import db from "../db/connection";

const Quirofano = db.define('Quirofanos', {
    id_quirofano: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_quirofano: {
        type: DataTypes.TEXT
    },
    tiempo_uso: {
        type: DataTypes.TEXT
    }
}
);
export default Quirofano;