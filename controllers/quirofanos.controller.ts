
import { Request, Response } from "express";
import Quirofano from "../models/quirofano";

export const getQuirofanos = async (req: Request, res: Response ) => {
    try {
        const quirofanos = await Quirofano.findAndCountAll({attributes: ['id_quirofano','nombre_quirofano','tiempo_uso']});
    
        res.json( {
            msg: 'get Quirofanos',
            quirofanos
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}