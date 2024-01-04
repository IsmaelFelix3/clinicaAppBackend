
import { Request, Response } from "express";
import Quirofano from "../models/quirofano";
import { body } from "express-validator";
import HorariosQuirofanos from "../models/horarioQuirofano";

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

export const getHorariosQuirofanos = async( req: Request, res: Response ) => {
    const {quirofano} = req.params;
    console.log(quirofano)
    try {

        const horariosQuirofanos = await HorariosQuirofanos.findAll({
            raw: true,
            where: {
                quirofano
            },
            attributes: ['quirofano','hora', 'minutos']
        });
       
        res.json({
            msg: 'schedules Operating Room',
            horariosQuirofanos
        })
        
    }   catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}