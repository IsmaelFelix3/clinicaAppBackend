import { DataTypes, Op } from "sequelize";
import db from "../db/connection";


const historialInsumosProcedimiento = db.define('Historial_Insumos_Procedimiento', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    procedimiento: {
        type: DataTypes.STRING
    },
    sku: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    numero_factura_compra: {
        type: DataTypes.STRING
    },
    numero_lote: {
        type: DataTypes.STRING
    },
    fecha_caducidad: {
        type: DataTypes.STRING
    },
    cantidad_actual: {
        type: DataTypes.INTEGER
    },
    laboratorio: {
        type: DataTypes.STRING
    },
    dosis: {
        type: DataTypes.STRING
    },
    fecha_factura: {
        type: DataTypes.STRING
    },
    codigo_barras: {
        type: DataTypes.STRING
    },
    proveedor: {
        type: DataTypes.STRING
    },
    nombre_comercial: {
        type: DataTypes.STRING
    },
    modelo: {
        type: DataTypes.STRING
    },
    clasificacion: {
        type: DataTypes.STRING
    },
    nombre_producto: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    },
    moneda: {
        type: DataTypes.STRING
    },
    unidad_medida: {
        type: DataTypes.STRING
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
    tasa_impuesto: {
        type: DataTypes.STRING
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
    forma_farmaceutica: {
        type: DataTypes.STRING
    },
    fecha_alta: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
},
{
    freezeTableName: true,
    tableName: 'historial_insumos_procedimiento'
}
);


export default historialInsumosProcedimiento;
