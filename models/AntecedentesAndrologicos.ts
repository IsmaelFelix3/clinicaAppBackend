import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Andrologicos = db.define('Antecedentes_Andrologicos', {
    id_antecedentes_andrologicos: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    circuncision: {
        type: DataTypes.BOOLEAN
    },
    criptorquidia: {
        type: DataTypes.BOOLEAN
    },
    vsa: {
        type: DataTypes.TINYINT
    },
    numero_parejas: {
        type: DataTypes.TINYINT
    },
    ets: {
        type: DataTypes.STRING
    },
    transtorno_ereccion: {
        type: DataTypes.TEXT
    },
    andropausia: {
        type: DataTypes.TEXT
    }
});

export default Antecedentes_Andrologicos;