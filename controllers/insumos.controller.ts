
import { Request, Response } from "express";
import Insumo from "../models/insumos";
import HistorialInsumosProcedimientos from "../models/historialInsumosProcedimiento";
import { Op, Sequelize } from "sequelize";

export const getInsumos = async (req: Request, res: Response ) => {
    try {

        const insumos = await Insumo.findAndCountAll({
            attributes: ['id_insumo', 'sku', 'descripcion', 'estado', 'numero_factura_compra', 'numero_lote', 'fecha_caducidad', 'cantidad_minima',
                         'cantidad_maxima', 'cantidad_actual', 'id_laboratorio', 'dosis', 'fecha_factura', 'codigo_barras', 'id_proveedor', 'nombre_comercial',
                         'modelo', 'id_clasificacion', 'nombre_producto', 'id_categoria', 'id_marca', 'moneda', 'id_unidad_medida', 'precio_venta', 'costo',
                         'codigo_sat', 'id_tasa_impuesto', 'id_informacion_farmaceutica', 'fecha_alta'
                     ]
        });
    
        res.json( {
            msg: 'Get Insumos',
            insumos
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getInsumoByCodigo = async (req: Request, res: Response ) => {
    const { codigo } = req.params;
    try {
        const insumo = await Insumo.findOne({
            where: {
                codigo
            }
        });
    
        res.json( {
            msg: 'Get Insumo',
            insumo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postInsumo = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const insumo = await Insumo.findOne({ 
            where: {
                codigo: body.codigo
            }
        });
    

        if(insumo){
            res.json( {
                msg: 'Insumo ya esta dado de alta'
            });
            return;
        }

        const insumoNuevo = Insumo.build(body);
        await insumoNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            insumoNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


export const postItemsMasive = async (req: Request, res: Response ) => {
    const body = req.body;
    // console.log(body)
    const result = JSON.parse(body);
    const procedures = result.map( (item: any) => item.group )
    console.log(procedures)
    try {

        const proceduresDb = await HistorialInsumosProcedimientos.findAll({

            attributes: [[Sequelize.literal('DISTINCT historial_insumos_procedimiento.procedimiento'), `procedimiento`]],
            where: {
                procedimiento: procedures
            },
        });

        const existingProcedures = proceduresDb.map(item => item.dataValues['procedimiento']);
  
        const newProcedures = procedures.filter((x: any) => !existingProcedures.includes(x));
        const existing = procedures.filter((x: any) => existingProcedures.includes(x));

        if(newProcedures.length === 0){
            res.json({
                msg: 'El archivo contiene procedimientos ya existentes, favor de revisar el folio de los procedimientos del archivo.',
                newProcedures,
                existing
            });
            return;
        }

        console.log(newProcedures)

        for (let i = 0; i < newProcedures.length; i++) {
            const element = newProcedures[i];

            for (let index = 0; index < result.length; index++) {
                if(result[index].group === element){
                    const insumoNuevo = await HistorialInsumosProcedimientos.bulkCreate(
                        result[index].values,{
                        validate: true
                    });
                }
            }
            
        }

        res.status(200).json({
            msg: 'Guardado con exito',
            newProcedures,
            existing
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


export const putInsumo = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const insumo = await Insumo.findOne({ 
            where: {
                codigo: body.codigo
            }
        });
    
        console.log(insumo)
        if(!insumo){
            res.json( {
                msg: 'Insumo no existe'
            });
            return;
        }

        await insumo.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            insumo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteInsumo = async( req: Request, res: Response ) => {

    const { id_insumo } = req.params;

    const insumo = await Insumo.findByPk(id_insumo);

    if(!insumo){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id_insumo
        });
    }

    // await insumo.update({ estado: false });
    await insumo.destroy();
    res.json({
        msg: 'Insumo Desactivado',
        id_insumo,
        insumo
    });

}