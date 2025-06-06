import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from "bcryptjs";

export const getUsuarios = async( req: Request, res: Response ) => {

    const usuarios = await Usuario.findAll();

    res.json({
        msg: 'getUsuarios',
        usuarios
    });

}

export const getUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if( usuario ){

        res.json({
            msg: 'getUsuario',
            usuario
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postUsuario = async( req: Request, res: Response ) => {
    console.log('entro')

    const { body } = req;
    const { password } = body;

    try {

        const existeCorreo = await Usuario.findOne({ 
            where: { 
                correo: body.correo 
            }
        });

        if(existeCorreo){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            })
        }

        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync( password, salt );

        const usuario = Usuario.build(body);
        await usuario.save();

        res.json( usuario );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administradorrrr'
        });
    }
}

export const putUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await usuario.update(body);

        res.json( usuario );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await usuario.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        usuario
    });

}

