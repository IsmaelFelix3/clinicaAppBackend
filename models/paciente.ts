import { DataTypes } from "sequelize";
import db from "../db/connection";
import Cita from "./cita";
import Expediente from "./expediente";
import Procedimientos from './procedimientos';

const Paciente = db.define('Paciente', {
    id_paciente: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    genero: {
        type:DataTypes.STRING
    },
    lugar_nacimiento: {
        type: DataTypes.TEXT
    },
    calle_y_numero:{
        type: DataTypes.TEXT
    },
    colonia: {
        type: DataTypes.TEXT
    },
    municipio: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.TEXT
    },
    estado_civil: {
        type: DataTypes.STRING
    },
    escolaridad: {
        type: DataTypes.STRING
    },
    profesion: {
        type: DataTypes.STRING
    },
    nacionalidad: {
        type: DataTypes.STRING
    },
    codigo_postal: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    google: {
        type: DataTypes.BOOLEAN
    },
    id_expediente: {
        type: DataTypes.INTEGER
    },
    rol: {
        type: DataTypes.STRING
    },
    fecha_registro: {
        type: DataTypes.DATE
    },
    password:{
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.TINYINT
    }
});
Paciente.hasOne( Expediente, 
    {
        sourceKey: 'id_expediente',
        foreignKey: 'id_expediente'
    }
);
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente' });
Procedimientos.belongsTo(Paciente, { foreignKey: 'id_paciente' });

export default Paciente;