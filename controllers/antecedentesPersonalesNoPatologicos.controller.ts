import { Request, Response } from "express";
import AntecedentesPersonalesNoPatologicos from '../models/AntecedentesPersonalesNoPatologicos';
import Inmunizacion from "../models/inmunizacion";

export const getAntecedentesPersonalesNoPatologicos = async( req: Request, res: Response ) => {

    const antecedentesPersonalesNoPatologicos = await AntecedentesPersonalesNoPatologicos.findAll();

    res.json({
        msg: 'getAntecedentesPersonalesNoPatologicos',
        antecedentesPersonalesNoPatologicos
    });

}

export const getAntecedentePersonalNoPatologico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentePersonalNoPatologico = await AntecedentesPersonalesNoPatologicos.findByPk(id);

    if( antecedentePersonalNoPatologico ){

        res.json({
            msg: 'get AntecedentePersonalNoPatologico',
            antecedentePersonalNoPatologico
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postAntecedentesPersonalesNoPatologicos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const antecedentesPersonalesNoPatologicos = AntecedentesPersonalesNoPatologicos.build(body);
        await antecedentesPersonalesNoPatologicos.save();

        res.json( antecedentesPersonalesNoPatologicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putAntecedentesPersonalesNoPatologicos = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const antecedentesPersonalesNoPatologicos = await AntecedentesPersonalesNoPatologicos.findByPk(id);

        if(!antecedentesPersonalesNoPatologicos){
            return res.status(404).json({
                msg: 'No existe una antecedentesPersonalesNoPatologicoss con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await antecedentesPersonalesNoPatologicos.update(body);

        res.json( antecedentesPersonalesNoPatologicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteAntecedentesPersonalesNoPatologicos = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesPersonalesNoPatologicos = await AntecedentesPersonalesNoPatologicos.findByPk(id);

    if(!antecedentesPersonalesNoPatologicos){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await antecedentesPersonalesNoPatologicos.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        antecedentesPersonalesNoPatologicos
    });

}

