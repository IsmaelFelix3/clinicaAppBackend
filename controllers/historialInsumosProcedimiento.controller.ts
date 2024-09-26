import { Request, Response } from "express";
import HistorialInsumosProcedimiento from '../models/historialInsumosProcedimiento';

export const getHistorialInsumosProcedimiento = async( req: Request, res: Response ) => {

    const historialInsumosProcedimiento = await HistorialInsumosProcedimiento.findAll();

    res.json({
        msg: 'get Historial Insumos Procedimiento',
        historialInsumosProcedimiento
    });

}


export const getHistorialInsumosByProcedure = async( req: Request, res: Response ) => {

    const { id } = req.params; 

    const historialInsumosProcedimiento = await HistorialInsumosProcedimiento.findAll({
        where: {
            procedimiento: id
        }
    });

    res.json({
        msg: 'get Historial Insumos Procedimiento',
        historialInsumosProcedimiento
    });

}