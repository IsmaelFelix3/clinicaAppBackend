import { DataTypes } from "sequelize";
import db from "../db/connection";

const Procedimientos = db.define('Procedimientos', {
    id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_medico: {
        type: DataTypes.INTEGER
    },
    id_paciente: {
        type: DataTypes.INTEGER
    },
    id_quirofano: {
        type: DataTypes.INTEGER
    },
    fecha_procedimiento: {
        type: DataTypes.DATE
    }
}
);
export default Procedimientos;