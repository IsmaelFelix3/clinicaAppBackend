import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Andrologicos = db.define('Antecedentes_Andrologicos', {
    id_antecedentes_andrologicos: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    circuncision: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    criptorquidia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    vsa: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    numero_parejas: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    ets: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    },
    transtorno_ereccion: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    },
    andropausia: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
},
{
    freezeTableName: true,
    tableName: 'antecedentes_andrologicos'
}
);

export default Antecedentes_Andrologicos;