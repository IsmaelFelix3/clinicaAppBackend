import { DataTypes } from "sequelize";
import db from "../db/connection";
import Paciente from "./paciente";

const Cita = db.define('Citas', {
    id_cita: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_medico: {
        type: DataTypes.MEDIUMINT
    },
    id_paciente: {
        type: DataTypes.MEDIUMINT
    },
    estatus: {
        type: DataTypes.STRING
    },
    fecha_cita: {
        type: DataTypes.DATE
    },
    motivo_consulta: {
        type: DataTypes.TEXT
    },
    sintoma_principal: {
        type: DataTypes.TEXT
    },
    resultados_estudios_realizados: {
        type: DataTypes.TEXT
    },
    pulso: {
        type: DataTypes.STRING
    },
    presion_arterial: {
        type: DataTypes.STRING
    },
    temperatura: {
        type: DataTypes.STRING
    },
    frecuencia_cardiaca: {
        type: DataTypes.STRING
    },
    frecuencia_respiratoria: {
        type: DataTypes.STRING
    },
    peso_paciente: {
        type: DataTypes.STRING
    },
    inspeccion_general: {
        type: DataTypes.TEXT
    },
    diagnostico: {
        type: DataTypes.TEXT
    },
    tratamiento: {
        type: DataTypes.TEXT
    }
});

// Paciente.hasMany(Cita, { foreignKey: 'id_paciente' });

export default Cita;