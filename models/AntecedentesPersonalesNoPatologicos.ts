import { DataTypes, HasOne } from "sequelize";
import db from "../db/connection";
import Inmunizacion from "./inmunizacion";

const Antecendentes_Personales_No_Patologicos = db.define('Antecedentes_Personales_No_Patologicos', { 
    id_antecedentes_personales_no_patologicos: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    fumador: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    alcohol: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    drogas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    id_inmunizacion: {
        type: DataTypes.MEDIUMINT
    },
    otros: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
});

Antecendentes_Personales_No_Patologicos.hasMany( Inmunizacion,
    {
        sourceKey: 'id_inmunizacion',
        foreignKey: 'id_inmunizacion',
        as: 'Inmunizaciones'
    }
);

export default Antecendentes_Personales_No_Patologicos;