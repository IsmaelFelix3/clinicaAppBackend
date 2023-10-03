import { Request, Response } from "express";
import OtrasEnfermedades from '../models/otrasEnfermedades';

export const getOtrasEnfermedades = async( req: Request, res: Response ) => {

    const otrasEnfermedades = await OtrasEnfermedades.findAll();

    res.json({
        msg: 'get otrasEnfermedades',
        otrasEnfermedades
    });

}

export const getOtraEnfermedad = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const otrasEnfermedades = await OtrasEnfermedades.findByPk(id);

    if( otrasEnfermedades ){

        res.json({
            msg: 'get otrasEnfermedades',
            otrasEnfermedades
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una otrasEnfermedades con el id ${ id }`
        });
    }
}

export const postOtraEnfermedad = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const otrasEnfermedades = OtrasEnfermedades.build(body);
        await otrasEnfermedades.save();

        res.json( otrasEnfermedades );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putOtraEnfermedad = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const otrasEnfermedades = await OtrasEnfermedades.findByPk(id);

        if(!otrasEnfermedades){
            return res.status(404).json({
                msg: 'No existe un otrasEnfermedades con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await otrasEnfermedades.update(body);

        res.json( otrasEnfermedades );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteOtraEnfermedad = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const otrasEnfermedades = await OtrasEnfermedades.findByPk(id);

    if(!otrasEnfermedades){
        return res.status(404).json({
            msg: 'No existe un edificio con el id' + id
        });
    }

    await otrasEnfermedades.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'otrasEnfermedades Eliminado',
        id,
        otrasEnfermedades
    });

}

