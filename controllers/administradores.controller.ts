
import { Request, Response } from "express";
import Administrador from '../models/administrador';

export const getAdminByEmail = async (req: Request, res: Response ) => {
    const { correo } = req.body;
    try {

        const admin = await Administrador.findOne({ 
            where: {
                correo
            }
        });

        res.json( {
            msg: 'Admin By Email',
            admin
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}