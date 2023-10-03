import { DataTypes } from "sequelize";
import db from "../db/connection";

const Estudio_Realizado = db.define('Estudios_Realizados', {
    id_estudio: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_paciente: {
        type: DataTypes.MEDIUMINT
    },
    archivo: {
        type: DataTypes.STRING
    }
});

export default Estudio_Realizado;