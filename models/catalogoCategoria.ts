import { DataTypes } from "sequelize";
import db from "../db/connection";

const Catalogo_Categoria = db.define('Catalogo_Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_categoria: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_categorias'
}
);


export default Catalogo_Categoria;