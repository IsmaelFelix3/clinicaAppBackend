import { DataTypes } from "sequelize";
import db from "../db/connection";


const Medico_Paciente = db.define('Medico_Pacientes', {
    id_medico: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
    }
});

export default Medico_Paciente;