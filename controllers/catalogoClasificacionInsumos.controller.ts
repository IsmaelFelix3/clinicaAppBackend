import { Request, Response } from "express";
import CatalogoClasificacionInsumos from "../models/catalogoClasificacionInsumo";

export const getClasificaciones = async (req: Request, res: Response ) => {
    try {

        const clasificaciones = await CatalogoClasificacionInsumos.findAndCountAll({
            attributes: [ 'id_clasificacion', 'nombre_clasificacion' ]
        });
    
        res.json( {
            msg: 'Get clasifications',
            clasificaciones
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getClasificationById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const clasificacion = await CatalogoClasificacionInsumos.findOne({
            where: {
                id_clasificacion: id
            }
        });
    
        res.json( {
            msg: 'Get clasification',
            clasificacion
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postClasificacion = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const clasificacion = await CatalogoClasificacionInsumos.findOne({ 
            where: {
                nombre_clasificacion: body.nombre
            }
        });
    

        if(clasificacion){
            res.json( {
                msg: 'Clasifiacion ya esta dado de alta'
            });
            return;
        }

        const clasificacionNuevo = CatalogoClasificacionInsumos.build(body);
        await clasificacionNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            clasificacionNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putClasifiacion = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const clasifiacion = await CatalogoClasificacionInsumos.findOne({ 
            where: {
                id_clasifiacion: body.id
            }
        });
    
        console.log(clasifiacion)
        if(!clasifiacion){
            res.json( {
                msg: 'Clasifiacion no existe'
            });
            return;
        }

        await clasifiacion.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            clasifiacion
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteClasifiacion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const clasificacion = await CatalogoClasificacionInsumos.findByPk(id);

    if(!clasificacion){
        return res.status(404).json({
            msg: 'No existe una clasificacion con el id' + id
        });
    }

    await clasificacion.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Clasificacion Desactivada'
    });

}