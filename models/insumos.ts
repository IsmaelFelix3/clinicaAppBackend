import { DataTypes } from "sequelize";
import db from "../db/connection";
import InformacionFarmaceutica from "./InformacionFarmaceutica";
import Catalogo_Laboratorio from "./catalogoLaboratorio";
import Catalogo_Proveedores from "./catalogoProveedores";
import Catalogo_Clasificacion_Insumo from "./catalogoClasificacionInsumo";
import Catalogo_Categoria from "./catalogoCategoria";
import Catalogo_Marca from "./catalogoMarca";
import Catalogo_Unidad_Medida from "./catalogoUnidadMedida";
import Catalogo_Tasa_Impuesto from "./catalogoTasaImpuesto";

const Insumo = db.define('Insumos', {
    id_insumo: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    sku: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    numero_factura_compra: {
        type: DataTypes.STRING
    },
    numero_lote: {
        type: DataTypes.STRING
    },
    fecha_caducidad: {
        type: DataTypes.DATE
    },
    cantidad_minima: {
        type: DataTypes.NUMBER
    },
    cantidad_maxima: {
        type: DataTypes.NUMBER
    },
    cantidad_actual: {
        type: DataTypes.NUMBER
    },
    id_laboratorio: {
        type: DataTypes.SMALLINT
    },
    dosis: {
        type: DataTypes.STRING
    },
    fecha_factura: {
        type: DataTypes.DATE
    },
    codigo_barras: {
        type: DataTypes.STRING
    },
    id_proveedor: {
        type: DataTypes.INTEGER
    },
    nombre_comercial: {
        type: DataTypes.STRING
    },
    modelo: {
        type: DataTypes.STRING
    },
    id_clasificacion: {
        type: DataTypes.SMALLINT
    },
    nombre_producto: {
        type: DataTypes.STRING
    },
    id_categoria: {
        type: DataTypes.INTEGER
    },
    id_marca: {
        type: DataTypes.INTEGER
    },
    moneda: {
        type: DataTypes.STRING
    },
    id_unidad_medida: {
        type: DataTypes.INTEGER
    },
    precio_venta: {
        type: DataTypes.DECIMAL
    },
    costo: {
        type: DataTypes.DECIMAL
    },
    codigo_sat: {
        type: DataTypes.STRING
    },
    id_tasa_impuesto: {
        type: DataTypes.SMALLINT
    },
    id_informacion_farmaceutica: {
        type: DataTypes.INTEGER
    },
    fecha_alta: {
        type: DataTypes.DATE
    }
},
{
    initialAutoIncrement: '1000'
}
);

Insumo.hasOne( Catalogo_Laboratorio, { foreignKey: 'id_laboratorio', sourceKey: 'id_laboratorio' });
Insumo.hasOne( Catalogo_Proveedores, { foreignKey: 'id_proveedor', sourceKey: 'id_proveedor' });
Insumo.hasOne( Catalogo_Clasificacion_Insumo, { foreignKey: 'id_clasificacion', sourceKey: 'id_clasificacion' });
Insumo.hasOne( Catalogo_Categoria, { foreignKey: 'id_categoria', sourceKey: 'id_categoria' });
Insumo.hasOne( Catalogo_Marca, { foreignKey: 'id_marca', sourceKey: 'id_marca' });
Insumo.hasOne( Catalogo_Unidad_Medida, { foreignKey: 'id_unidad_medida', sourceKey: 'id_unidad_medida' });
Insumo.hasOne( Catalogo_Tasa_Impuesto, { foreignKey: 'id_tasa_impuesto', sourceKey: 'id_tasa_impuesto' });
Insumo.hasOne( InformacionFarmaceutica, { foreignKey: 'id_informacion_farmaceutica', sourceKey: 'id_informacion_farmaceutica' });


export default Insumo;
