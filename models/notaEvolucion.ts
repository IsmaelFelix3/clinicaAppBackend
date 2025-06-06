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
    evolucion: {
        type: DataTypes.TEXT
    },
    indicaciones_terapeuticas: {
        type: DataTypes.TEXT
    },
    pronostico: {
        type: DataTypes.TEXT
    },
    fecha_cita: {
        type: DataTypes.DATE
    }
},{
    freezeTableName: true,
    initialAutoIncrement: '1000',
    tableName: 'nota_evolucion'
});

export default Nota_Evolucion;