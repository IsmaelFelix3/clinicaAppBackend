import { DataTypes } from "sequelize";
import db from "../db/connection";

const Horario = db.define('Horarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    horario: {
        type: DataTypes.SMALLINT
    }
});

export default Horario;