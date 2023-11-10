import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from 'jsonwebtoken';

import Usuario from '../models/usuario';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

const validarJWT = async(req: any, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const decoded = jwt.verify( token, process.env.SECRETORPRIVATEKEY! );

        // (req as CustomRequest).token = decoded;

        // const uid = (req as CustomRequest).token.id;

        req .token = decoded;

        const uid = req.token.id;

        const usuario = await Usuario.findByPk(uid);

        const estado = usuario?.getDataValue('estado');

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - Usuario Borrado DB'
            })
        }

        // Verificar si el usuario tiene estado en true
        if( estado !== 1 ){
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado invalido'
            })
        }
        req.usuario = usuario;
        next();

    } catch (error) {
        // console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}