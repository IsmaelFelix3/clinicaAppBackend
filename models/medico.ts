import { DataTypes, TINYINT } from "sequelize";
import db from "../db/connection";
import Cita from "./cita";
import Procedimientos from "./procedimientos";
import Consultorio from "./consultorio";
import Edificio from "./edificio";
import Piso from "./piso";

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
        type: DataTypes.TINYINT
    },
    id_piso: {
        type: DataTypes.SMALLINT
    },
    google: {
        type: DataTypes.BOOLEAN
    },
    rol: {
        type: DataTypes.STRING,
    },
    fecha_registro: {
        type: DataTypes.DATE
    },
    telefono: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estatus: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    id_consultorio: {
        type: DataTypes.SMALLINT
    }
},
{
    freezeTableName: true,
    tableName: 'medicos'
});

Cita.belongsTo(Medico, { foreignKey: 'id_medico' });
Procedimientos.belongsTo(Medico, { foreignKey: 'id_medico' });
Medico.hasOne( Edificio, {foreignKey: 'id_edificio', sourceKey: 'id_edificio'});
Medico.hasOne( Piso, {foreignKey: 'id_piso', sourceKey: 'id_piso'});
Medico.hasOne( Consultorio, {foreignKey: 'id_consultorio', sourceKey: 'id_consultorio'});

export default Medico;