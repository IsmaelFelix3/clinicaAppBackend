import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Heredo_Familiares = db.define('Antecedentes_Heredo_Familiares', {
    id_antecedentes_heredo_familiares: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    diabetes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hipertension_arterial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    cancer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    tipo_cancer: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    },
    familiar_cancer: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    },
    cardiopatas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    familiar_cardiopatas: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    },
    nefropatas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    familiar_nefropatas: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    },
    descripcion_malformaciones: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    }
},
{
    freezeTableName: true,
    tableName: 'antecedentes_heredo_familiares'
});

export default Antecedentes_Heredo_Familiares;