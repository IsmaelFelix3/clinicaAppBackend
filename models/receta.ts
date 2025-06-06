import { DataTypes } from "sequelize";
import db from "../db/connection";

const Receta = db.define('Recetas', {
    id_receta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_paciente: {
        type: DataTypes.MEDIUMINT
    },
    id_medico: {
        type: DataTypes.MEDIUMINT
    },
    peso_paciente: {
        type: DataTypes.STRING
    },
    fecha_receta: {
        type: DataTypes.DATE
    },
    tratamiento: {
        type: DataTypes.TEXT
    }
},
{
    freezeTableName: true,
    tableName: 'recetas'
},
);

export default Receta;