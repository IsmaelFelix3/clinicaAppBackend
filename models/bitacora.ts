import { DataTypes } from "sequelize";
import db from "../db/connection";
import Medico from "./medico";

const Bitacora = db.define('Bitacora', {
    id: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_ingreso: {
        type: DataTypes.STRING
    },
    nombre_ingreso: {
        type: DataTypes.STRING
    },
    nombre_acompanante: {
        type: DataTypes.STRING
    },
    motivo_ingreso: {
        type: DataTypes.STRING
    },
    medico: {
        type: DataTypes.SMALLINT
    },
    fecha: {
        type: DataTypes.DATE
    },
    hora_entrada: {
        type: DataTypes.STRING
    },
    hora_salida: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    tableName: 'bitacora'
});

Bitacora.hasOne(Medico, {sourceKey: 'medico',foreignKey: 'id_medico'})

export default Bitacora;