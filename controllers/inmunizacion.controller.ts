import { Request, Response } from "express";
import Inmunizacion from '../models/inmunizacion';

export const getInmunizaciones = async( req: Request, res: Response ) => {

    const inmunizaciones = await Inmunizacion.findAll();

    res.json({
        msg: 'get inmunizaciones',
        inmunizaciones
    });

}

export const getInmunizacion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const inmunizacion = await Inmunizacion.findByPk(id);

    if( inmunizacion ){

        res.json({
            msg: 'get inmunizacion',
            inmunizacion
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postInmunizacion = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const inmunizacion = Inmunizacion.build(body);
        await inmunizacion.save();

        res.json( inmunizacion );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putInmunizacion = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const inmunizacion = await Inmunizacion.findByPk(id);

        if(!inmunizacion){
            return res.status(404).json({
                msg: 'No existe un edificio con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await inmunizacion.update(body);

        res.json( inmunizacion );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteInmunizacion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const inmunizacion = await Inmunizacion.findByPk(id);

    if(!inmunizacion){
        return res.status(404).json({
            msg: 'No existe un inmunizacion con el id' + id
        });
    }

    await inmunizacion.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'inmunizacion Eliminado',
        id,
        inmunizacion
    });

}

