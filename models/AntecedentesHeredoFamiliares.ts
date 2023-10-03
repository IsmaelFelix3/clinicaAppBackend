import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Heredo_Familiares = db.define('Antecedentes_Heredo_Familiares', {
    id_antecedentes_heredo_familiares: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    diabetes: {
        type: DataTypes.BOOLEAN
    },
    hipertension_arterial: {
        type: DataTypes.BOOLEAN
    },
    cancer: {
        type: DataTypes.BOOLEAN
    },
    tipo_cancer: {
        type: DataTypes.STRING
    },
    familiar_cancer: {
        type: DataTypes.STRING
    },
    cardiopatas: {
        type: DataTypes.BOOLEAN
    },
    familiar_cardiopatas: {
        type: DataTypes.STRING
    },
    nefropatas: {
        type: DataTypes.BOOLEAN
    },
    familiar_nefropatas: {
        type: DataTypes.STRING
    },
    descripcion_malformaciones: {
        type: DataTypes.STRING
    }
});

export default Antecedentes_Heredo_Familiares;