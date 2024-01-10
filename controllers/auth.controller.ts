import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario';
import Medico from '../models/medico';
import Administrador from '../models/administrador';
import Paciente from '../models/paciente';
import { JwtAdapter } from '../helpers/index';
const { generarJWT } = require("../helpers/generar-jwt");

export const login = async(req: Request, res: Response) => {

    const { correo, password } = req.body;

    const userLogin = await Usuario.findOne({
        attributes: ['correo','estatus','rol', 'password', 'id_usuario'],
        where:{
            correo
        }
    });

    const estatus = userLogin?.getDataValue('estatus');
    const passwordUser = userLogin?.getDataValue('password');
    const uid = userLogin?.getDataValue('id_usuario');
    try {
        if( !userLogin ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }

        if( estatus !== 1 ){
            return res.status(400).json({
                msg: 'Usuario inhablitado'
            });
        }

        const validPassword = bcryptjs.compareSync( password, passwordUser );
       
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        console.log(uid)
        const token = await JwtAdapter.generateToken({ uid });

        if(!token){
            return res.status(500).json({
                msg: 'Error en la generacion de token'
            })
        }

        const obj = {
            correo: userLogin?.getDataValue('correo'),
            rol: userLogin?.getDataValue('rol'),
            estatus: userLogin?.getDataValue('estatus')
        }

        res.json({
            msg: 'Auth User',
            userLogin: obj,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

   
}


export const revalidarToken = async( req: any, res: Response ) => {

    try {
        const token = req.header('Authorization');

        const result: any = await JwtAdapter.validateToken(token.split(' ')[1]);
    
        if(result == false){
            return res.status(500).json({
                msg: 'Error al validar el token'
            })
        }
        const { uid } = result;
    
        const userLogin = await Usuario.findByPk(uid, {
            attributes: ['rol','estatus','correo']
        });
    
        const newToken = await JwtAdapter.generateToken({uid});
    
        return res.status(200).json({
            msg: 'Token Revalidate',
            userLogin,
            newToken
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

   
}