import { DataTypes } from "sequelize";
import db from "../db/connection";
import Quirofano from "./quirofano";

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

Procedimientos.belongsTo( Quirofano, { foreignKey: 'id_quirofano'} );

export default Procedimientos;