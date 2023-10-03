import { Request, Response } from "express";
import NotaEvolucion from '../models/notaEvolucion';

export const getNotasEvolucion = async( req: Request, res: Response ) => {

    const notasEvolucion = await NotaEvolucion.findAll();

    res.json({
        msg: 'get notasEvolucion',
        notasEvolucion
    });

}

export const getNotaEvolucion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const notaEvolucion = await NotaEvolucion.findByPk(id);

    if( notaEvolucion ){

        res.json({
            msg: 'get notaEvolucion',
            notaEvolucion
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una nota Evolucion con el id ${ id }`
        });
    }
}

export const postNotaEvolucion = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const notaEvolucion = NotaEvolucion.build(body);
        await notaEvolucion.save();

        res.json( notaEvolucion );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putNotaEvolucion = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const notaEvolucion = await NotaEvolucion.findByPk(id);

        if(!notaEvolucion){
            return res.status(404).json({
                msg: 'No existe un notaEvolucion con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await notaEvolucion.update(body);

        res.json( notaEvolucion );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteNotaEvolucion = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const notaEvolucion = await NotaEvolucion.findByPk(id);

    if(!notaEvolucion){
        return res.status(404).json({
            msg: 'No existe un notaEvolucion con el id' + id
        });
    }

    await notaEvolucion.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'notaEvolucion Eliminado',
        id,
        notaEvolucion
    });

}

