import { DataTypes } from "sequelize";
import db from "../db/connection";

const Antecedentes_Gineco_Obstetrico = db.define('Antecedentes_Gineco_Obstetricos', {
    id_antecedentes_gineco_obstetrico: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    menarca: {
        type: DataTypes.TINYINT
    },
    ciclo_menstrual: {
        type: DataTypes.TEXT
    },
    vsa: {
        type: DataTypes.TINYINT
    },
    numero_parejas: {
        type: DataTypes.TINYINT
    },
    numero_embarazos: {
        type: DataTypes.TINYINT
    },
    numero_partos: {
        type: DataTypes.TINYINT
    },
    abortos: {
        type: DataTypes.TINYINT
    },
    cesareas: {
        type: DataTypes.TINYINT
    },
    metodo_anticonceptivo: {
        type: DataTypes.TEXT
    },
    fecha_ultima_menstruacion: {
        type: DataTypes.DATE
    },
    ets: {
        type: DataTypes.STRING
    },
    menopausia: {
        type: DataTypes.TEXT
    },
    papanicolau: {
        type: DataTypes.TEXT
    },
    lactancia_materna: {
        type: DataTypes.TEXT
    }
});

export default Antecedentes_Gineco_Obstetrico;