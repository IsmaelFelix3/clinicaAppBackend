import { Request, Response } from "express";
import AntecedenteAndrologico from '../models/AntecedentesAndrologicos';

export const getAntecedentesAndrologicos = async( req: Request, res: Response ) => {

    const antecedentesAndrologicos = await AntecedenteAndrologico.findAll();

    res.json({
        msg: 'getAntecedentesAndrologicos',
        antecedentesAndrologicos
    });

}

export const getAntecedenteAndrologico = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesAndrologicos = await AntecedenteAndrologico.findByPk(id);

    if( antecedentesAndrologicos ){

        res.json({
            msg: 'aetAntecedentesAndrologicos',
            antecedentesAndrologicos
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postAntecedentesAndrologicos = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const antecedentesAndrologicos = AntecedenteAndrologico.build(body);
        await antecedentesAndrologicos.save();

        res.json( antecedentesAndrologicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putAntecedentesAndrologicos = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const antecedentesAndrologicos = await AntecedenteAndrologico.findByPk(id);

        if(!antecedentesAndrologicos){
            return res.status(404).json({
                msg: 'No existe una antecedentesAndrologicos con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await antecedentesAndrologicos.update(body);

        res.json( antecedentesAndrologicos );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteAntecedentesAndrologicos = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const antecedentesAndrologicos = await AntecedenteAndrologico.findByPk(id);

    if(!antecedentesAndrologicos){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await antecedentesAndrologicos.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        antecedentesAndrologicos
    });

}

