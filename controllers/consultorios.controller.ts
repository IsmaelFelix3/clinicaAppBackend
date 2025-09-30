import { Request, Response } from "express";
import Consultorio from "../models/consultorio";

export const getConsultorios = async( req: Request, res: Response ) => {

    const consultorios = await Consultorio.findAndCountAll();

    res.json({
        msg: 'get Consulting Room',
        consultorios
    });

}

export const getConsultorio = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const consultorio = await Consultorio.findByPk(id);

    if( consultorio ){

        res.json({
            msg: 'get Consulting Room',
            consultorio
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un consultorio con el id ${ id }`
        });
    }
}

export const postConsultorio = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const consultorio = Consultorio.build(body);
        await consultorio.save();

        res.json( consultorio );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putConsultorio = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const consultorio = await Consultorio.findByPk(id);

        if(!consultorio){
            return res.status(404).json({
                msg: 'No existe un piso con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await consultorio.update(body);

        res.json( consultorio );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteConsultorio = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const consultorio = await Consultorio.findByPk(id);

    if(!consultorio){
        return res.status(404).json({
            msg: 'No existe un piso con el id' + id
        });
    }

    // await consultorio.update({ estado: false });
    await consultorio.destroy();

    res.json({
        msg: 'Consultorio Eliminado',
        id,
        consultorio
    });

}

export const getConsultingRoomByFloorId = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const consultorios = await Consultorio.findAndCountAll({
        where: {
            id_piso: id
        }
    });

    if( consultorios ){

        res.json({
            msg: 'get Consulting Room',
            consultorios
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un consultorio con el id ${ id }`
        });
    }
}