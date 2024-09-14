import { Request, Response } from "express";
import CatalogoUnidadMedida from "../models/catalogoUnidadMedida";

export const getUnidadMedidas = async (req: Request, res: Response ) => {
    try {

        const unidadMedidas = await CatalogoUnidadMedida.findAndCountAll({
            attributes: [ 'id_unidad_medida', 'unidad_medida', 'estado' ]
        });
    
        res.json( {
            msg: 'Get Unidad Medida',
            unidadMedidas
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getUnidadMedidaById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const unidadMedida = await CatalogoUnidadMedida.findOne({
            where: {
                id_unidad_medida: id
            }
        });
    
        res.json( {
            msg: 'Get Unidad Medida',
            unidadMedida
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postUnidadMedida = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const unidadMedida = await CatalogoUnidadMedida.findOne({ 
            where: {
                unidad_medida: body.nombre
            }
        });
    

        if(unidadMedida){
            res.json( {
                msg: 'Unidad de medida ya esta dado de alta'
            });
            return;
        }

        const unidadMedidaNuevo = CatalogoUnidadMedida.build(body);
        await unidadMedidaNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            unidadMedidaNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putUnidadMedida = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const unidadMedida = await CatalogoUnidadMedida.findOne({ 
            where: {
                id_unidad_medida: body.id
            }
        });
    
        console.log(unidadMedida)
        if(!unidadMedida){
            res.json( {
                msg: 'Unidad de medida no existe'
            });
            return;
        }

        await unidadMedida.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            unidadMedida
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteUnidadMedida = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const unidadMedida = await CatalogoUnidadMedida.findByPk(id);

    if(!unidadMedida){
        return res.status(404).json({
            msg: 'No existe una unidad de medida con el id' + id
        });
    }

    await unidadMedida.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Unidad de medida Desactivada'
    });

}