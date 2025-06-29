import { Request, Response } from "express";
import Medico from '../models/medico';
import bcryptjs from "bcryptjs";

export const getMedicos = async( req: Request, res: Response ) => {

    const medicos = await Medico.findAll();

    res.json({
        msg: 'getMedicos',
        medicos
    });

}

export const getMedicoByEmail = async (req: Request, res: Response ) => {
    console.log(req.body, 'PAram body')

    const { correo } = req.body;
    try {
        const medico = await Medico.findOne({ 
            where: {
                correo
            }
        });

        console.log(medico)
    
        res.json( {
            msg: 'Medico By Email',
            medico
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getMedico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const medico = await Medico.findByPk(id);

    if( medico ){

        res.json({
            msg: 'getMedico',
            medico
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postMedico = async( req: Request, res: Response ) => {

    const { body } = req;
    const { password } = body;

    try {

        const existeEmail = await Medico.findOne({ 
            where: { 
                correo: body.correo 
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            });
        }

        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync( password, salt );

        const medico = Medico.build(body);
        await medico.save();

        res.json( medico );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putMedico = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const medico = await Medico.findByPk(id);

        if(!medico){
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await medico.update(body);

        res.json( medico );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteMedico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const medico = await Medico.findByPk(id);

    if(!medico){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await medico.update({ estatus: 0 });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        medico
    });

}

