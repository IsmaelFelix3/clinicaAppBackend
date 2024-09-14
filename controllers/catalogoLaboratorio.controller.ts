import { Request, Response } from "express";
import CatalogoLaboratorio from "../models/catalogoLaboratorio";

export const getLaboratorios = async (req: Request, res: Response ) => {
    try {

        const laboratorios = await CatalogoLaboratorio.findAndCountAll({
            attributes: [ 'id_laboratorio', 'nombre_laboratorio' ]
        });
    
        res.json( {
            msg: 'Get Labs',
            laboratorios
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getLaboratorioById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const laboratorio = await CatalogoLaboratorio.findOne({
            where: {
                id_laboratorio: id
            }
        });
    
        res.json( {
            msg: 'Get Lab',
            laboratorio
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postLaboratorio = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const laboratorio = await CatalogoLaboratorio.findOne({ 
            where: {
                nombre_laboratorio: body.nombre
            }
        });
    

        if(laboratorio){
            res.json( {
                msg: 'Laboratorio ya esta dado de alta'
            });
            return;
        }

        const laboratorioNuevo = CatalogoLaboratorio.build(body);
        await laboratorioNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            laboratorioNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putLaboratorio = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const laboratorio = await CatalogoLaboratorio.findOne({ 
            where: {
                id_laboratorio: body.id
            }
        });
    
        console.log(laboratorio)
        if(!laboratorio){
            res.json( {
                msg: 'Laboratorio no existe'
            });
            return;
        }

        await laboratorio.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            laboratorio
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteLaboratorio = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const laboratorio = await CatalogoLaboratorio.findByPk(id);

    if(!laboratorio){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await laboratorio.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Laboratorio Desactivado'
    });

}