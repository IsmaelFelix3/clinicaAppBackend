import { DataTypes } from "sequelize";
import db from "../db/connection";

const Nota_PostOperatoria = db.define('Nota_PostOperatoria', {
    id_nota_evolucion: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_expediente: {
        type: DataTypes.MEDIUMINT
    },
    id_paciente: {
        type: DataTypes.MEDIUMINT
    },
    fecha_procedimiento: {
        type: DataTypes.DATE
    },
    tipo_procedimiento: {
        type: DataTypes.INTEGER
    },
    hallazgos: {
        type: DataTypes.TEXT
    },
},{
    freezeTableName: true
});

export default Nota_PostOperatoria;