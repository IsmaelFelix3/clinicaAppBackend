import { Request, Response } from "express";
import Piso from '../models/piso';

export const getPisos = async( req: Request, res: Response ) => {

    const pisos = await Piso.findAndCountAll();

    res.json({
        msg: 'get pisos',
        pisos
    });

}

export const getPiso = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const piso = await Piso.findByPk(id);

    if( piso ){

        res.json({
            msg: 'get piso',
            piso
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postPiso = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const piso = Piso.build(body);
        await piso.save();

        res.json( piso );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putPiso = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const piso = await Piso.findByPk(id);

        if(!piso){
            return res.status(404).json({
                msg: 'No existe un piso con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await piso.update(body);

        res.json( piso );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deletePiso = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const piso = await Piso.findByPk(id);

    if(!piso){
        return res.status(404).json({
            msg: 'No existe un piso con el id' + id
        });
    }

    await piso.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'piso Eliminado',
        id,
        piso
    });

}

export const getPisosByEdificioId = async( req: Request, res: Response ) => {

    const { id } = req.params;
    try {

        const pisos = await Piso.findAndCountAll({
            where: {
                id_edificio: id
            }
        });

        res.json({
            msg: 'get piso',
            pisos
        });
        
    } catch (error) {

         console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }
}

