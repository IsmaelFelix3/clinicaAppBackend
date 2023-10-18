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
        type: DataTypes.BOOLEAN
    },
    alcohol: {
        type: DataTypes.BOOLEAN
    },
    drogas: {
        type: DataTypes.BOOLEAN
    },
    diabetes: {
        type: DataTypes.STRING
    },
    id_inmunizacion: {
        type: DataTypes.MEDIUMINT
    },
    otros: {
        type: DataTypes.TEXT
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