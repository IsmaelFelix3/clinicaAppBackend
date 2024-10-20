import { DataTypes } from "sequelize";
import db from "../db/connection";
import Antecendentes_Personales_No_Patologicos from "./AntecedentesPersonalesNoPatologicos";

const Hospitalizacion = db.define('Hospitalizaciones', {
    id_hospitalizacion: {
        type: DataTypes.MEDIUMINT,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion_hospitalizacion: {
        type: DataTypes.TEXT,
        defaultValue: 'N/R'
    }
});



export default Hospitalizacion;