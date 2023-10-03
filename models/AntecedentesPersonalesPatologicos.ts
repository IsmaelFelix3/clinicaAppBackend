import { DataTypes } from "sequelize";
import db from "../db/connection";
import Hospitalizacion from "./hospitalizacion";
import Antecedentes_Quirurgicos from "./AntecedentesQuirurgicos";
import Otras_Enfermedades from "./otrasEnfermedades";

const Antecedentes_Personales_Patologicos = db.define('Antecedentes_Personales_Patologicos', { 
    id_antecedentes_personales_patologicos: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    enfermedades_infantiles: {
        type: DataTypes.TEXT
    },
    secuelas: {
        type: DataTypes.TEXT
    },
    id_hospitalizacion: {
        type: DataTypes.MEDIUMINT
    },
    id_antecedentes_quirurgicos: {
        type: DataTypes.MEDIUMINT
    },
    id_otras_enfermedades: {
        type: DataTypes.MEDIUMINT
    }
});

Antecedentes_Personales_Patologicos.hasOne( Hospitalizacion, 
    {
        sourceKey: 'id_hospitalizacion',
        foreignKey: 'id_hospitalizacion',
        as: 'hospitalizaciones'
    }
);

Antecedentes_Personales_Patologicos.hasOne( Antecedentes_Quirurgicos,
    {
        sourceKey: 'id_antecedentes_quirurgicos',
        foreignKey: 'id_antecedentes_quirurgicos',
        as: 'antecedentes_quirurgicos'
    }
);

Antecedentes_Personales_Patologicos.hasOne( Otras_Enfermedades,
    {
        sourceKey: 'id_otras_enfermedades',
        foreignKey: 'id_otras_enfermedades',
        as: 'otras_enfermedades'
    }
);

export default Antecedentes_Personales_Patologicos;