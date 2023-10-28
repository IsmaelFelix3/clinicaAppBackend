import { DataTypes } from "sequelize";
import db from "../db/connection";
import Antecedentes_Personales_Patologicos from "./AntecedentesPersonalesPatologicos";
import Antecedentes_Personales_No_Patologicos from "./AntecedentesPersonalesNoPatologicos";
import Antecedentes_Andrologicos from "./AntecedentesAndrologicos";
import Antecedentes_Heredo_Familiares from "./AntecedentesHeredoFamiliares";
import Antecedentes_Gineco_Obstetrico from "./AntecedentesGinecoObstetrico";

const Expediente = db.define('Expediente', {
    id_expediente: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_paciente: {
        type: DataTypes.MEDIUMINT,
    },
    fecha_creacion_expediente: {
        type: DataTypes.DATE,
        defaultValue: new Date().toISOString()
    },
    edad_paciente: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    alergias: {
        type: DataTypes.TEXT,
        defaultValue: 'No declaradas'
    },
    tipo_sanguineo: {
        type: DataTypes.TEXT,
        defaultValue: 'No declarado'
    },
    id_antecedentes_heredo_familiares: {
        type: DataTypes.MEDIUMINT
    },
    id_antecedentes_personales_patologicos: {
        type: DataTypes.MEDIUMINT
    },
    id_antecedentes_personales_no_patologicos: {
        type: DataTypes.MEDIUMINT
    },
    id_antecedentes_andrologicos: {
        type: DataTypes.MEDIUMINT
    },
    id_antecedentes_gineco_obstetrico: {
        type: DataTypes.MEDIUMINT
    },
});

Expediente.hasOne( Antecedentes_Personales_Patologicos,
     { 
        foreignKey: 'id_antecedentes_personales_patologicos', 
        sourceKey: "id_antecedentes_personales_patologicos",
        
    } 
);

Expediente.hasOne( Antecedentes_Personales_No_Patologicos,
    { 
       foreignKey: 'id_antecedentes_personales_no_patologicos', 
       sourceKey: "id_antecedentes_personales_no_patologicos",
    }
);

Expediente.hasOne( Antecedentes_Andrologicos,
    { 
       foreignKey: 'id_antecedentes_andrologicos', 
       sourceKey: "id_antecedentes_andrologicos",
       
   } 
);

Expediente.hasOne( Antecedentes_Gineco_Obstetrico,
    { 
       foreignKey: 'id_antecedentes_gineco_obstetrico', 
       sourceKey: "id_antecedentes_gineco_obstetrico",
       
   } 
);

Expediente.hasOne( Antecedentes_Heredo_Familiares,
    { 
       foreignKey: 'id_antecedentes_heredo_familiares', 
       sourceKey: "id_antecedentes_heredo_familiares",
    //    as: 'Antecedentes_Heredo_Familiar'
   } 
);

export default Expediente;