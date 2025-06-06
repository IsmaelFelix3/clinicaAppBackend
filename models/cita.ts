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
        type: DataTypes.STRING,
        defaultValue: 'En espera'
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
        type: DataTypes.STRING,
        defaultValue: '0'
    },
    presion_arterial: {
        type: DataTypes.STRING,
        defaultValue: '0'
    },
    temperatura: {
        type: DataTypes.STRING,
        defaultValue: '0'
    },
    frecuencia_cardiaca: {
        type: DataTypes.STRING,
        defaultValue: '0'
    },
    frecuencia_respiratoria: {
        type: DataTypes.STRING,
        defaultValue: '0'
    },
    peso_paciente: {
        type: DataTypes.STRING
    },
    inspeccion_general: {
        type: DataTypes.TEXT,
        defaultValue: '0'
    },
    diagnostico: {
        type: DataTypes.TEXT
    },
    tratamiento: {
        type: DataTypes.TEXT
    },
    evolucion: {
        type: DataTypes.TEXT
    },
    pronostico: {
        type: DataTypes.TEXT
    }
},
{
    freezeTableName: true,
    tableName: 'citas'
}
);

// Paciente.hasMany(Cita, { foreignKey: 'id_paciente' });

export default Cita;