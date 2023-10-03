import { DataTypes } from "sequelize";
import db from "../db/connection";

const Piso = db.define('Piso', {
    id_piso: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_medico: {
        type: DataTypes.MEDIUMINT
    },
    descripcion_piso: {
        type: DataTypes.STRING
    }
});

export default Piso;