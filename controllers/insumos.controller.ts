
import { Request, Response } from "express";
import Insumo from "../models/insumos";

export const getInsumos = async (req: Request, res: Response ) => {
    try {

        const insumos = await Insumo.findAndCountAll({
            attributes: ['id_insumo', 'codigo', 'descripcion', 'estado', 'createdAt', 'facturaCompra','perecedero', 'numeroLote', 'fechaCaducidad', 'cantidadMinima', 'cantidadMaxima', 'cantidadActual' ]
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