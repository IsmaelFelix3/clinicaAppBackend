
import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    rol: {
        type: DataTypes.STRING
    },
    fecha_registro: {
        type: DataTypes.DATE
    }
},
{
    initialAutoIncrement: '1000'
});

export default Usuario;