import { DataTypes } from "sequelize";
import db from "../db/connection";

const Medico = db.define('Medico', {
    id_medico: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    especialidad: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.STRING
    },
    permiso_secre_salud: {
       type: DataTypes.STRING
    },
    id_edificio: {
        type: DataTypes.MEDIUMINT
    },
    id_piso: {
        type: DataTypes.TINYINT
    },
    google: {
        type: DataTypes.BOOLEAN
    },
    rol: {
        type: DataTypes.STRING
    },
    fecha_registro: {
        type: DataTypes.DATE
    }
});

export default Medico;