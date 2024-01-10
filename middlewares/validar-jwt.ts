import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from 'jsonwebtoken';

import Usuario from '../models/usuario';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

   const JWT_SEED = process.env.JWT_SEED || 'E99878F9A6F071FD40D5863BCB2075C78FF2010EF4D2289E884848160D2716BD';

const validarJWT = async(req: any, res: Response, next: NextFunction) => {

    console.log('entrooooo Validar JWT')

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    console.log(token, JWT_SEED)

    try {
        console.log('llego')
        const decoded = jwt.verify( token, JWT_SEED,  (err: any, result: any) => { return res.status(200).send({ err: err, result: result, }); });
        console.log('llego aqui')
        
        // (req as CustomRequest).token = decoded;
        
        // const uid = (req as CustomRequest).token.id;
        
        req.token = decoded;

        const uid = req.token.uid;

        const usuario = await Usuario.findByPk(uid);

        const estatus = usuario?.getDataValue('estatus');


        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - Usuario Borrado DB'
            })
        }

        // Verificar si el usuario tiene estado en true
        if( estatus !== 1 ){
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado invalido'
            })
        }
        req.usuario = usuario;
        console.log('todo bieneenenenenenene')
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}