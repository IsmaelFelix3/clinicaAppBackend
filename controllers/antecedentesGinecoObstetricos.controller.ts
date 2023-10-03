import { Request, Response } from "express";
import AntecedenteGinecoObstetrico from '../models/AntecedentesGinecoObstetrico';

export const getAntecedentesGinecoObstetricos = async( req: Request, res: Response ) => {

    const antecedentesGinecoObstetricos = await AntecedenteGinecoObstetrico.findAll();

    res.json({
        msg: 'getAntecedentesGinecoObstetricos',
        antecedentesGinecoObstetricos
    });

}

export const getAntecedenteGinecoObstetrico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesGinecoObstetricos = await AntecedenteGinecoObstetrico.findByPk(id);

    if( antecedentesGinecoObstetricos ){

        res.json({
            msg: 'aetAntecedentesGinecoObstetricos',
            antecedentesGinecoObstetricos
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postAntecedentesGinecoObstetricos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const antecedentesGinecoObstetricos = AntecedenteGinecoObstetrico.build(body);
        await antecedentesGinecoObstetricos.save();

        res.json( antecedentesGinecoObstetricos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putAntecedentesGinecoObstetricos = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const antecedentesGinecoObstetricos = await AntecedenteGinecoObstetrico.findByPk(id);

        if(!antecedentesGinecoObstetricos){
            return res.status(404).json({
                msg: 'No existe una antecedentesGinecoObstetricos con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await antecedentesGinecoObstetricos.update(body);

        res.json( antecedentesGinecoObstetricos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteAntecedentesGinecoObstetricos = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesGinecoObstetricos = await AntecedenteGinecoObstetrico.findByPk(id);

    if(!antecedentesGinecoObstetricos){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await antecedentesGinecoObstetricos.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        antecedentesGinecoObstetricos
    });

}

