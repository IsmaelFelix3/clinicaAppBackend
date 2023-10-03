import { Request, Response } from "express";
import Receta from '../models/receta';

export const getRecetas = async( req: Request, res: Response ) => {

    const recetas = await Receta.findAll();

    res.json({
        msg: 'get recetas',
        recetas
    });

}

export const getReceta = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const receta = await Receta.findByPk(id);

    if( receta ){

        res.json({
            msg: 'get receta',
            receta
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una receta con el id ${ id }`
        });
    }
}

export const postReceta = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const receta = Receta.build(body);
        await receta.save();

        res.json( receta );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putReceta = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const receta = await Receta.findByPk(id);

        if(!receta){
            return res.status(404).json({
                msg: 'No existe un receta con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await receta.update(body);

        res.json( receta );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteReceta = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const receta = await Receta.findByPk(id);

    if(!receta){
        return res.status(404).json({
            msg: 'No existe un receta con el id' + id
        });
    }

    await receta.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'receta Eliminado',
        id,
        receta
    });

}

