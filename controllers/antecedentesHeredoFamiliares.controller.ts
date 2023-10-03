import { Request, Response } from "express";
import AntecedenteHeredoFamiliares from '../models/AntecedentesHeredoFamiliares';

export const getAntecedentesHeredoFamiliares = async( req: Request, res: Response ) => {

    const antecedentesHeredoFamiliares = await AntecedenteHeredoFamiliares.findAll();

    res.json({
        msg: 'getAntecedentesHeredoFamiliaress',
        antecedentesHeredoFamiliares
    });

}

export const getAntecedenteHeredoFamiliar = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesHeredoFamiliares = await AntecedenteHeredoFamiliares.findByPk(id);

    if( antecedentesHeredoFamiliares ){

        res.json({
            msg: 'aetAntecedentesHeredoFamiliaress',
            antecedentesHeredoFamiliares
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postAntecedentesHeredoFamiliares = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const antecedentesHeredoFamiliares = AntecedenteHeredoFamiliares.build(body);
        await antecedentesHeredoFamiliares.save();

        res.json( antecedentesHeredoFamiliares );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putAntecedentesHeredoFamiliares = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const antecedentesHeredoFamiliares = await AntecedenteHeredoFamiliares.findByPk(id);

        if(!antecedentesHeredoFamiliares){
            return res.status(404).json({
                msg: 'No existe una antecedentesHeredoFamiliaress con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await antecedentesHeredoFamiliares.update(body);

        res.json( antecedentesHeredoFamiliares );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteAntecedentesHeredoFamiliares = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesHeredoFamiliares = await AntecedenteHeredoFamiliares.findByPk(id);

    if(!antecedentesHeredoFamiliares){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await antecedentesHeredoFamiliares.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        antecedentesHeredoFamiliares
    });

}

