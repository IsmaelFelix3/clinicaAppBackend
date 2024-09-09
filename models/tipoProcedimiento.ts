
import { DataTypes } from "sequelize";
import db from "../db/connection";
import Procedimientos from "./procedimientos";

const Tipo_Procedimientos = db.define('Tipo_Procedimientos', {
    id_tipo_procedimiento: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_procedimiento: {
        type: DataTypes.STRING,
        unique: true,
    },
    insumos_predefinidos: {
        type: DataTypes.INTEGER
    },
    tiempo_procedimiento: {
        type: DataTypes.STRING
    },
});

// Tipo_Procedimientos.belongsTo( Procedimientos, { foreignKey: 'id_tipo_procedimiento'} );

export default Tipo_Procedimientos;