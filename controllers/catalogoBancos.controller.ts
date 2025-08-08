import { Request, Response } from "express";
import CatalogoBancos from "../models/banco";

export const getBanks = async (req: Request, res: Response ) => {
    try {

        const bancos = await CatalogoBancos.findAndCountAll({
            attributes: [ 'id_banco', 'nombre_banco' ]
        });
    
        res.json( {
            msg: 'Get Banks',
            bancos
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getBankById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const banco = await CatalogoBancos.findOne({
            where: {
                id_banco: id
            }
        });
    
        res.json( {
            msg: 'Get Bank',
            banco
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postBank = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const banco = await CatalogoBancos.findOne({ 
            where: {
                nombre_banco: body.nombre_banco
            }
        });
    

        if(banco){
            res.json( {
                msg: 'El banco ya esta dado de alta'
            });
            return;
        }

        const bancoNuevo = CatalogoBancos.build(body);
        await bancoNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            bancoNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const editBank = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const banco = await CatalogoBancos.findOne({ 
            where: {
                id_banco: body.id_banco
            }
        });
    
        console.log(banco)
        if(!banco){
            res.json( {
                msg: 'Banco no existe'
            });
            return;
        }

        await banco.update(body);

        res.status(200).json({
            msg: 'Banco editado con exito',
            banco
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteBank = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const banco = await CatalogoBancos.findByPk(id);

    if(!banco){
        return res.status(404).json({
            msg: 'No existe un banco con el id' + id
        });
    }

    await banco.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Banco Desactivado'
    });

}