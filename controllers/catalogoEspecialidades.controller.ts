import { Request, Response } from "express";
import CatalogoEspecialidades from "../models/catalogoEspecialidades";

export const getSpecialties = async (req: Request, res: Response ) => {
    try {

        const specialties = await CatalogoEspecialidades.findAndCountAll({
            attributes: [ 'id_especialidad', 'nombre_especialidad' ],
            order: [
                ['nombre_especialidad', 'ASC']
            ]
        });
    
        res.json( {
            msg: 'Get Specialties',
            specialties
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getSpecialtyById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const specialty = await CatalogoEspecialidades.findOne({
            where: {
                id_especialidad: id
            }
        });
    
        res.json( {
            msg: 'Get specialty',
            specialty
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postSpecialty = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const specialty = await CatalogoEspecialidades.findOne({ 
            where: {
                nombre_especialidad: body.nombre_especialidad
            }
        });
    

        if(specialty){
            res.json( {
                msg: 'La especialidad ya esta dado de alta'
            });
            return;
        }

        const newSpecialty = CatalogoEspecialidades.build(body);
        await newSpecialty.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            newSpecialty
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const editSpecialty = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const specialty = await CatalogoEspecialidades.findOne({ 
            where: {
                id_especialidad: body.id_especialidad
            }
        });
    
        console.log(specialty)
        if(!specialty){
            res.json( {
                msg: 'Especialidad no existe'
            });
            return;
        }

        await specialty.update(body);

        res.status(200).json({
            msg: 'Especialidad editada con exito',
            specialty
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteSpecialty = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const specialty = await CatalogoEspecialidades.findByPk(id);

    if(!specialty){
        return res.status(404).json({
            msg: 'No existe una especialidad con el id' + id
        });
    }

    // await specialty.update({ estado: false });
    await specialty.destroy();
    res.json({
        msg: 'Especialidad Eliminada'
    });

}