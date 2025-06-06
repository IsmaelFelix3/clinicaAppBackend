
import { Request, Response } from "express";
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import CatalogoProcedimiento from '../models/CatalogoProcedimiento';
import Quirofano from "../models/quirofano";


export const getCatalogoProcedimientos = async (req: Request, res: Response) => {
    try {
        const catalogoProcedimiento = await CatalogoProcedimiento.findAll({
            attributes: [ 'id_procedimiento', 'especialidad', 'nombre_procedimiento', 'quirofano'],
            raw: true 
        });
        res.json({
            msg: 'getCatalogoProcedimientos',
            catalogoProcedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getCatalogoProcedimientosByOperatingRoom = async (req: Request, res: Response) => {
    try {
        const { operatingRoomId } = req.params;

        console.log(operatingRoomId) 

        const catalogoProcedimiento = await CatalogoProcedimiento.findAndCountAll({
            attributes: [ 'id_procedimiento', 'especialidad', 'nombre_procedimiento', 'quirofano'],
            include: Quirofano,
            raw: true,
            where: {
                quirofano: operatingRoomId
            }
        });
        res.json({
            msg: 'getCatalogoProcedimientos',
            catalogoProcedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postCatalogoProcedimientos = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const catalogoProcedimiento = await CatalogoProcedimiento.findOne({ 
            where: {
                nombre_procedimiento: body.nombre_procedimiento
            }
        });
    

        if(catalogoProcedimiento){
            res.json( {
                msg: 'Este procedimiento ya esta dado de alta'
            });
            return;
        }

        const catalogoProcedimientoNuevo = CatalogoProcedimiento.build(body);
        await catalogoProcedimientoNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            catalogoProcedimientoNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}