import { Request, Response } from "express";
import Edificio from '../models/edificio';

export const getEdificios = async( req: Request, res: Response ) => {

    const edificios = await Edificio.findAll();

    res.json({
        msg: 'get Edificios',
        edificios
    });

}

export const getEdificio = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const edificio = await Edificio.findByPk(id);

    if( edificio ){

        res.json({
            msg: 'get edificio',
            edificio
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postEdificio = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const edificio = Edificio.build(body);
        await edificio.save();

        res.json( edificio );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putEdificio = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const edificio = await Edificio.findByPk(id);

        if(!edificio){
            return res.status(404).json({
                msg: 'No existe un edificio con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await edificio.update(body);

        res.json( edificio );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteEdificio = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const edificio = await Edificio.findByPk(id);

    if(!edificio){
        return res.status(404).json({
            msg: 'No existe un edificio con el id' + id
        });
    }

    await edificio.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Edificio Eliminado',
        id,
        edificio
    });

}

