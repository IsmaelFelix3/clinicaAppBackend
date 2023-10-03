import { Request, Response } from "express";
import AntecedentesPersonalesPatologicos from '../models/AntecedentesPersonalesPatologicos';
import Hospitalizacion from "../models/hospitalizacion";
import Antecedentes_Quirurgicos from "../models/AntecedentesQuirurgicos";

export const getAntecedentesPersonalesPatologicos = async( req: Request, res: Response ) => {

    const antecedentesPersonalesPatologicos = await AntecedentesPersonalesPatologicos.findAll({
        include: [
            { model: Hospitalizacion, as: 'hospitalizaciones' },
            { model: Antecedentes_Quirurgicos, as: 'antecedentes_quirurgicos' }
        ]
    });

    res.json({
        msg: 'getAntecedentesPersonales Patologicos',
        antecedentesPersonalesPatologicos
    });

}

export const getAntecedentePersonalPatologico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentePersonalPatologico = await AntecedentesPersonalesPatologicos.findByPk(id);

    if( antecedentePersonalPatologico ){

        res.json({
            msg: 'get AntecedentePersonalNoPatologico',
            antecedentePersonalPatologico
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postAntecedentesPersonalesPatologicos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const antecedentesPersonalesPatologicos = AntecedentesPersonalesPatologicos.build(body);
        await antecedentesPersonalesPatologicos.save();

        res.json( antecedentesPersonalesPatologicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putAntecedentesPersonalesPatologicos = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const antecedentesPersonalesPatologicos = await AntecedentesPersonalesPatologicos.findByPk(id);

        if(!antecedentesPersonalesPatologicos){
            return res.status(404).json({
                msg: 'No existe una antecedentesPersonalesPatologicos con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await antecedentesPersonalesPatologicos.update(body);

        res.json( antecedentesPersonalesPatologicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteAntecedentesPersonalesPatologicos = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesPersonalesPatologicos = await AntecedentesPersonalesPatologicos.findByPk(id);

    if(!antecedentesPersonalesPatologicos){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await antecedentesPersonalesPatologicos.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        antecedentesPersonalesPatologicos
    });

}

