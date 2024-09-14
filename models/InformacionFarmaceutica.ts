import { DataTypes } from "sequelize";
import db from "../db/connection";

const InformacionFarmaceutica = db.define('Informacion_Farmaceutica', {
    id_informacion_farmaceutica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_insumo: {
        type: DataTypes.INTEGER
    },
    nombre_ingrediente_activo: {
        type: DataTypes.STRING
    },
    denominacion_generica_prod: {
        type: DataTypes.STRING
    },
    denominacion_distintiva_prod: {
        type: DataTypes.STRING
    },
    datos_fabricante: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
}
);


export default InformacionFarmaceutica;