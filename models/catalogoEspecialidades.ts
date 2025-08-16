import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Especialidad = db.define('Catalogo_Especialidad', {
    id_especialidad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_especialidad: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_especialidades'
});

export default Catalogo_Especialidad;