import { Request, Response } from "express";
import Paciente from '../models/paciente';
import Expediente from "../models/expediente";
import MedicoPaciente from "../models/MedicoPaciente";

export const getPacientes = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const medicoPaciente =  await MedicoPaciente.findAll({ where: {
            id_medico: id,
        }, 
        raw: true
    });

    const pacientes = medicoPaciente.map( (element: any) => element.id_paciente );

    const paciente = await Paciente.findAll({
        include: { 
                model: Expediente
        },
        where: {
            id_paciente: pacientes
        } 
    });

    res.json({
        msg: 'getPacientes',
        paciente
    });

}

export const getPaciente = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);

    if( paciente ){

        res.json({
            msg: 'getPaciente',
            paciente
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postPaciente = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const existeEmail = await Paciente.findOne({ 
            where: { 
                correo: body.correo 
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            })
        }

        const paciente = Paciente.build(body);
        await paciente.save();

        res.json( paciente );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putPaciente = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const paciente = await Paciente.findByPk(id);

        if(!paciente){
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await paciente.update(body);

        res.json( paciente );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deletePaciente = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);

    if(!paciente){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await paciente.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Paciente Eliminado',
        id,
        paciente
    });

}

