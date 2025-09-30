import { Request, Response } from "express";
import Bitacora from "../models/bitacora";

export const getBitacoraRecords = async (req: Request, res: Response ) => {
    try {

        const registros = await Bitacora.findAndCountAll({
            
        });
    
        res.json( {
            msg: 'Get bitacora records',
            registros
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getRecordById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const registro = await Bitacora.findOne({
            where: {
                id
            }
        });
    
        res.json( {
            msg: 'Get Record',
            registro
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postBitacoraRecord = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const nuevoRegistro = Bitacora.build(body);
        await nuevoRegistro.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            nuevoRegistro
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const editRegistro = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const registro = await Bitacora.findOne({ 
            where: {
                id: body.id
            }
        });
    
        console.log(registro)
        if(!registro){
            res.json( {
                msg: 'Banco no existe'
            });
            return;
        }

        await registro.update(body);

        res.status(200).json({
            msg: 'Registro editado con exito',
            registro
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteRegistro = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const registro = await Bitacora.findByPk(id);

    if(!registro){
        return res.status(404).json({
            msg: 'No existe un banco con el id' + id
        });
    }

    // await banco.update({ estado: false });
    await registro.destroy();
    res.json({
        msg: 'Registro eliminado Eliminado'
    });

}