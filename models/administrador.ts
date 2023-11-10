import { DataTypes } from "sequelize";
import db from "../db/connection";

const Administrador = db.define('Administradores', {
    id_admin: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.TINYINT
    },
    correo: {
        type: DataTypes.STRING,
        unique: true
    },
    fecha_registro: {
        type: DataTypes.DATE
    }
},
{
    initialAutoIncrement: '1000'
}
);

export default Administrador;
