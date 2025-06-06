
import { DataTypes } from "sequelize";
import db from "../db/connection";
import Quirofano from "./quirofano";

const Catalogo_Procedimientos = db.define('Catalogo_Procedimientos', {
    id_procedimiento: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    especialidad:{
        type: DataTypes.TEXT
    },
    nombre_procedimiento: {
        type: DataTypes.STRING,
        unique: true,
    },
    quirofano: {
        type: DataTypes.INTEGER
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_procedimientos'
});

Catalogo_Procedimientos.hasOne(Quirofano,{
    foreignKey: 'id_quirofano',
    sourceKey: 'quirofano'
});

// Tipo_Procedimientos.belongsTo( Procedimientos, { foreignKey: 'id_tipo_procedimiento'} );

export default Catalogo_Procedimientos;