import { Request, Response } from "express";
import Hospitalizacion from '../models/hospitalizacion';

export const getHospitalizaciones = async( req: Request, res: Response ) => {

    const hospitalizaciones = await Hospitalizacion.findAll();

    res.json({
        msg: 'get hospitalizaciones',
        hospitalizaciones
    });

}

export const getHospitalizacion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const hospitalizacion = await Hospitalizacion.findByPk(id);

    if( hospitalizacion ){

        res.json({
            msg: 'get hospitalizacion',
            hospitalizacion
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una hospitalizacion con el id ${ id }`
        });
    }
}

export const postHospitalizacion = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const hospitalizacion = Hospitalizacion.build(body);
        await hospitalizacion.save();

        res.json( hospitalizacion );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putHospitalizacion = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const hospitalizacion = await Hospitalizacion.findByPk(id);

        if(!hospitalizacion){
            return res.status(404).json({
                msg: 'No existe un hospitalizacion con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await hospitalizacion.update(body);

        res.json( hospitalizacion );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteHospitalizacion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const hospitalizacion = await Hospitalizacion.findByPk(id);

    if(!hospitalizacion){
        return res.status(404).json({
            msg: 'No existe un hospitalizacion con el id' + id
        });
    }

    await hospitalizacion.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'hospitalizacion Eliminado',
        id,
        hospitalizacion
    });

}

