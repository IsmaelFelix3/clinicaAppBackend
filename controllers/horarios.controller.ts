import { Request, Response } from "express";
import Horario from "../models/Horario";

export const getHorarios = async( req: Request, res: Response ) => {

    const horarios = await Horario.findAll({ attributes : ['id','horario'] });

    res.json({
        msg: 'get Horarios',
        horarios
    });

}

export const getHorario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const horario = await Horario.findByPk(id);

    if( horario ){

        res.json({
            msg: 'get horario',
            horario
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postHorario = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const horario = Horario.build(body);
        await horario.save();

        res.json( horario );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putHorario = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const horario = await Horario.findByPk(id);

        if(!horario){
            return res.status(404).json({
                msg: 'No existe un horario con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await horario.update(body);

        res.json( horario );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteHorario = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const horario = await Horario.findByPk(id);

    if(!horario){
        return res.status(404).json({
            msg: 'No existe un horario con el id' + id
        });
    }

    await horario.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'horario Eliminado',
        id,
        horario
    });

}

