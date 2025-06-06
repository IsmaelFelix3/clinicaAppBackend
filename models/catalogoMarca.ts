import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Marca = db.define('Catalogo_Marca', {
    id_marca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_marca: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_marcas'
}
);


export default Catalogo_Marca;