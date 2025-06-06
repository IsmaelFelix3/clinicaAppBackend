import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Gineco_Obstetrico = db.define('Antecedentes_Gineco_Obstetricos', {
    id_antecedentes_gineco_obstetrico: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    menarca: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    ciclo_menstrual: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    },
    vsa: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    numero_parejas: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    numero_embarazos: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    numero_partos: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    abortos: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    cesareas: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    metodo_anticonceptivo: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    },
    fecha_ultima_menstruacion: {
        type: DataTypes.DATE
    },
    ets: {
        type: DataTypes.STRING,
        defaultValue: 'N/R'
    },
    menopausia: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    },
    papanicolau: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    },
    lactancia_materna: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
},
{
    freezeTableName: true,
    tableName: 'antecedentes_gineco_obstetricos'
});

export default Antecedentes_Gineco_Obstetrico;