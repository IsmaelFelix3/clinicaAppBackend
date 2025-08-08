import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Banco = db.define('Catalogo_Banco', {
    id_banco: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_banco: {
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_bancos'
});

export default Catalogo_Banco;