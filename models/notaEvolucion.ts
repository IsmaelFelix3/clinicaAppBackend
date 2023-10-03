import { DataTypes } from "sequelize";
import db from "../db/connection";

const Nota_Evolucion = db.define('Nota_Evolucion', {
    id_nota_evolucion: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_paciente: {
        type: DataTypes.MEDIUMINT
    },
    id_cita: {
        type: DataTypes.MEDIUMINT
    },
    diagnostico: {
        type: DataTypes.TEXT
    },
    tratamiento: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
});

export default Nota_Evolucion;