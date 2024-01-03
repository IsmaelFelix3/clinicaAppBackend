
import { Request, Response } from "express";
import CatalogoMotivoConsulta from "../models/catalogoMotivoConsulta";

export const getMotivoConsulta = async (req: Request, res: Response ) => {
    console.log('motivo consulta')
    try {

        const motivoConsulta = await CatalogoMotivoConsulta.findAll({
            attributes: ['motivo_consulta']
        });

        res.json( {
            msg: 'GetMotivoConsulta',
            motivoConsulta
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}