import { DataTypes } from "sequelize";
import db from "../db/connection";
import Catalogo_Especialidad from "./catalogoEspecialidades";


const Catalogo_Procedimientos = db.define('Catalogo_Procedimientos', {
    id_procedimiento: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    especialidad:{
        type: DataTypes.MEDIUMINT
    },
    nombre_procedimiento: {
        type: DataTypes.STRING,
        unique: true,
    },
    folio:{
        type: DataTypes.TEXT
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_procedimientos'
});

Catalogo_Procedimientos.hasOne(Catalogo_Especialidad,{
    foreignKey: 'id_especialidad',
    sourceKey: 'especialidad'
});


// Tipo_Procedimientos.belongsTo( Procedimientos, { foreignKey: 'id_tipo_procedimiento'} );

export default Catalogo_Procedimientos;