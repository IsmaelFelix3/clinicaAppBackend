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
        where:{
            correo
        }
    });

    // const rolUsuario = usuarioLogin?.dataValues.rol;

    // let userLogin;
    // switch (rolUsuario) {
    //     case 'Medico':
    //         userLogin = await Medico.findOne({ 
    //                 where:{
    //                     correo 
    //                 } 
    //             });
    //         break;
    //     case 'Admin':
    //         userLogin = await Administrador.findOne({ 
    //             where:{
    //                 correo 
    //             } 
    //         });
    //         break;
    //     case 'Paciente':
    //         userLogin = await Paciente.findOne({ 
    //             where:{
    //                 correo 
    //             } 
    //         });
    //         break;
    // }

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

        const token = await JwtAdapter.generateToken({ uid });

        if(!token){
            return res.status(500).json({
                msg: 'Error en la generacion de token'
            })
        }

        res.json({
            msg: 'Auth User',
            userLogin,
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

    const uid = req.token.uid;
    console.log(uid, 'revalidar token')

    const usuarioDB = await Usuario.findByPk(uid);

    const token = await JwtAdapter.generateToken({uid});

    return res.status(200).json({
        msg: 'Token Revalidate',
        uid,
        usuarioDB,
        token
    })
}