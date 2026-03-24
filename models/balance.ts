import { DataTypes } from "sequelize";
import db from "../db/connection";

const Administrador = db.define('Balance', {
    id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    importe: {
        type: DataTypes.INTEGER
    },
    isBlocked: {
        type: DataTypes.BOOLEAN
    }
},
{
    freezeTableName: true,
    tableName: 'balance'
});

export default Administrador;
