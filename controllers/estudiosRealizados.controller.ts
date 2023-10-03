import { Request, Response } from "express";
import EstudioRealizado from '../models/estudioRealizado';

export const getEstudiosRealizados = async( req: Request, res: Response ) => {

    const estudiosRealizados = await EstudioRealizado.findAll();

    res.json({
        msg: 'get Edificios',
        estudiosRealizados
    });

}

export const getEstudioRealizado = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const estudioRealizado = await EstudioRealizado.findByPk(id);

    if( estudioRealizado ){

        res.json({
            msg: 'get estudioRealizado',
            estudioRealizado
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un estudioRealizado con el id ${ id }`
        });
    }
}

export const postEstudiosRealizados = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const estudiosRealizados = EstudioRealizado.build(body);
        await estudiosRealizados.save();

        res.json( estudiosRealizados );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putEstudiosRealizados = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const estudiosRealizados = await EstudioRealizado.findByPk(id);

        if(!estudiosRealizados){
            return res.status(404).json({
                msg: 'No existe un estudiosRealizados con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await estudiosRealizados.update(body);

        res.json( estudiosRealizados );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteEstudiosRealizados = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const estudiosRealizados = await EstudioRealizado.findByPk(id);

    if(!estudiosRealizados){
        return res.status(404).json({
            msg: 'No existe un estudiosRealizados con el id' + id
        });
    }

    await estudiosRealizados.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'estudiosRealizados Eliminado',
        id,
        estudiosRealizados
    });

}

