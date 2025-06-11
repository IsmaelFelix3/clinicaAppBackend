
import { Request, Response } from "express";
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import CatalogoProcedimiento from '../models/CatalogoProcedimiento';
import Quirofano from "../models/quirofano";


export const getCatalogoProcedimientos = async (req: Request, res: Response) => {
    try {
        const catalogoProcedimiento = await CatalogoProcedimiento.findAndCountAll({
            attributes: [ 'id_procedimiento', 'especialidad', 'nombre_procedimiento', 'quirofano', 'precioBase'],
            raw: true,
            include: Quirofano,
        });
        res.json({
            msg: 'getCatalogoProcedimientos',
            catalogoProcedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al obtener el catalogo de procedimientos, contacte con el administrador'
        });
    }
}

export const getCatalogoProcedimientosByOperatingRoom = async (req: Request, res: Response) => {
    try {
        const { operatingRoomId } = req.params;

        const catalogoProcedimiento = await CatalogoProcedimiento.findAndCountAll({
            attributes: [ 'id_procedimiento', 'especialidad', 'nombre_procedimiento', 'quirofano','precioBase'],
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
            msg: 'Error al agregar un nuevo procedimiento, contacte con el admministrador'
        });
    }
}

export const getProcedureConfigurationDetails = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const detallesProcedimiento = await CatalogoProcedimiento.findOne({ 
            where: {
                id_procedimiento: id
            },
            include: Quirofano
        });

        res.status(200).json({
            msg: 'Detalles Procedimiento',
            detallesProcedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al obtener los detalles del procedimiento, contacte con el admministrador'
        });
    }
}

export const putProcedureConfigurationDetails = async (req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try{
        const detallesProcedimiento = await CatalogoProcedimiento.findByPk(id);

        if(!detallesProcedimiento){
            return res.status(404).json({
                msg: 'No existe un procedimiento con el id ' + id
            })
        }
        await detallesProcedimiento.update(body);

        res.status(200).json( detallesProcedimiento );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error al editar el procedimiento, contacte con el admministrador'
        });
    }
}


export const deleteProcedureDetails = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const detallesProcedimiento = await CatalogoProcedimiento.findByPk(id);

    if(!detallesProcedimiento){
        return res.status(404).json({
            msg: 'No existe un procedimiento con el id ' + id
        });
    }

    // await detallesProcedimiento.update({ estatus: 0 });
    await detallesProcedimiento.destroy();

    res.status(200).json({
        msg: 'Procedimiento Eliminado'
    });

}