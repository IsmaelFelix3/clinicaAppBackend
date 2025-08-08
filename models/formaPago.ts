import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Forma_Pago = db.define('Catalogo_Forma_Pago', {
    id_forma_pago: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_forma_pago: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_forma_pago'
});

export default Catalogo_Forma_Pago;