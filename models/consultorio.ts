import { BelongsTo, DataTypes } from "sequelize";
import db from "../db/connection";
import Medico from "./medico";
import Piso from "./piso";

const Consultorio = db.define('Consultorio', {
    id_consultorio: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion_consultorio: {
        type: DataTypes.STRING
    },
    id_edificio: {
        type: DataTypes.TINYINT
    }
},
{
    freezeTableName: true,
    tableName: 'consultorios'
}
);

// Consultorio.belongsTo( Piso, { foreignKey: 'id_piso'})

export default Consultorio;