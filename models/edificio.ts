import { DataTypes } from "sequelize";
import db from "../db/connection";

const Edificio = db.define('Edificio', {
    id_edificio: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    num_consultorios: {
        type: DataTypes.TINYINT
    }
},
{
    freezeTableName: true,
    tableName: 'edificios'
});

export default Edificio;