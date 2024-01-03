import { DataTypes } from "sequelize";
import db from "../db/connection";

const CatalogoMotivoConsulta = db.define('Catalogo_Motivo_Consulta', {
    motivo_consulta: {
        type: DataTypes.TEXT,
    }
}
);
export default CatalogoMotivoConsulta;