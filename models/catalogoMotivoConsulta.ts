import { DataTypes } from "sequelize";
import db from "../db/connection";

const CatalogoMotivoConsulta = db.define('Catalogo_Motivo_Consulta', {
    motivo_consulta: {
        type: DataTypes.TEXT,
    }
},
{
    freezeTableName: true,
    tableName: 'catalogo_motivo_consulta'
}
);
export default CatalogoMotivoConsulta;