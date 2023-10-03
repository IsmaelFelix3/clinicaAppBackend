import { Request, Response } from "express";
import AntecedenteQuirurgico from '../models/AntecedentesQuirurgicos';

export const getAntecedentesQuirurgicos = async( req: Request, res: Response ) => {

    const antecedentesQuirurgicos = await AntecedenteQuirurgico.findAll();

    res.json({
        msg: 'get Antecedentes Quirurgicos',
        antecedentesQuirurgicos
    });

}

export const getAntecedenteQuirurgico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesQuirurgicos = await AntecedenteQuirurgico.findByPk(id);

    if( antecedentesQuirurgicos ){

        res.json({
            msg: 'aetantecedentesQuirurgicos',
            antecedentesQuirurgicos
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postAntecedentesQuirurgicos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const antecedentesQuirurgicos = AntecedenteQuirurgico.build(body);
        await antecedentesQuirurgicos.save();

        res.json( antecedentesQuirurgicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putAntecedentesQuirurgicos = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const antecedentesQuirurgicos = await AntecedenteQuirurgico.findByPk(id);

        if(!antecedentesQuirurgicos){
            return res.status(404).json({
                msg: 'No existe una antecedentesQuirurgicos con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await antecedentesQuirurgicos.update(body);

        res.json( antecedentesQuirurgicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteAntecedentesQuirurgicos = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesQuirurgicos = await AntecedenteQuirurgico.findByPk(id);

    if(!antecedentesQuirurgicos){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await antecedentesQuirurgicos.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        antecedentesQuirurgicos
    });

}

