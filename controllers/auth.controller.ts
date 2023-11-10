import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario';
import Medico from '../models/medico';
import Administrador from '../models/administrador';
import Paciente from '../models/paciente';
const { generarJWT } = require("../helpers/generar-jwt");

export const login = async(req: Request, res: Response) => {

    console.log('entro log in')

    const { correo, password } = req.body;

    console.log(correo, 'correo')
    console.log(password, 'password')

    const usuario = await Usuario.findOne({
        where:{
            correo
        }
    });

    const rolUsuario = usuario?.dataValues.rol;

    let userLogin;

    switch (rolUsuario) {
        case 'Medico':
            userLogin = await Medico.findOne({ 
                    where:{
                        correo 
                    } 
                });
            break;
        case 'Admin':
            userLogin = await Administrador.findOne({ 
                where:{
                    correo 
                } 
            });
            break;
        case 'Paciente':
            userLogin = await Paciente.findOne({ 
                where:{
                    correo 
                } 
            });
            break;
    }

    console.log(userLogin, 'usuario log in')


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

        // const validPassword = bcryptjs.compareSync( password, passwordMedico );
        console.log('password == passwordMedico', password, passwordUser)
        const validPassword = password == passwordUser ? true : false;

        // if( !validPassword ){
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - password'
        //     })
        // }
        if( validPassword == false ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // const token = await generarJWT( uid );

        res.json({
            msg: 'Auth User',
            userLogin,
            // token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

   
}

export const revalidarToken = async( req: any, res: Response ) => {

    const  uid  = req.token.id;

    const usuarioDB = await Usuario.findByPk(uid);

    const dbUsuarioId = usuarioDB?.getDataValue('idUsuario');
    const nombre = usuarioDB?.getDataValue('nombre');
    const correo = usuarioDB?.getDataValue('correo');
    const idRol = usuarioDB?.getDataValue('idRol');
    const apellidos = usuarioDB?.getDataValue('apellidos');
    const estado = usuarioDB?.getDataValue('estado');

    const token = await generarJWT(uid, dbUsuarioId);

    return res.status(200).json({
        msg: true,
        uid,
        nombre,
        correo,
        idRol,
        apellidos,
        estado,
        token
    })
}