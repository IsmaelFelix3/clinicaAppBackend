import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Quirurgicos = db.define('Antecedentes_Quirurgicos', {
    id_antecedentes_quirurgicos: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion_antecedente_quirurgico: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
},
{
    freezeTableName: true,
    tableName: 'antecedentes_quirurgicos'
});

export default Antecedentes_Quirurgicos;