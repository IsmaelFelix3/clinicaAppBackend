import { Request, Response } from "express";
import Expediente from '../models/expediente';
import AntecedentePP from "../models/AntecedentesPersonalesPatologicos";
import AntecedentePNP from "../models/AntecedentesPersonalesNoPatologicos";
import AntecedenteAndro from "../models/AntecedentesAndrologicos";
import AntecedenteHF from "../models/AntecedentesHeredoFamiliares";
import AntecedenteGO from "../models/AntecedentesGinecoObstetrico";

export const getExpedientes = async( req: Request, res: Response ) => {

    const expedientes = await Expediente.findAll({ 
        include: [
            { 
                model: AntecedentePNP, 
                include: [
                    {
                        association: 'Inmunizaciones'
                    }
                ] 
            },
            { 
                model: AntecedentePP,
                include: [
                    {
                        association: 'hospitalizaciones'
                    },
                    {
                        association: 'antecedentes_quirurgicos'
                    },
                    {
                        association: 'otras_enfermedades'
                    }
                ] 
            },
            { model: AntecedenteAndro },
            { model: AntecedenteGO },
            { model: AntecedenteHF },
        ] 
    });

    res.json({
        msg: 'get expedientes',
        expedientes
    });

}

export const getExpediente = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const expediente = await Expediente.findByPk(id, 
        {
            include: [
                { 
                    model: AntecedentePNP, 
                    include: [
                        {
                            association: 'Inmunizaciones'
                        }
                    ] 
                },
                { 
                    model: AntecedentePP,
                    include: [
                        {
                            association: 'hospitalizaciones'
                        },
                        {
                            association: 'antecedentes_quirurgicos'
                        },
                        {
                            association: 'otras_enfermedades'
                        }
                    ] 
                },
                { model: AntecedenteAndro },
                { model: AntecedenteGO },
                { model: AntecedenteHF },
            ] 
        }
    );

    if( expediente ){

        res.json({
            msg: 'get expediente',
            expediente
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}

export const postExpediente = async( req: Request, res: Response ) => {

    const { body } = req;

    console.log(body,'body')

    try {
        const expediente = Expediente.build(body);
        await expediente.save();

        res.json( expediente );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putExpediente = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const expediente = await Expediente.findByPk(id);

        if(!expediente){
            return res.status(404).json({
                msg: 'No existe un expediente con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await expediente.update(body);

        res.json( expediente );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteExpediente = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const expediente = await Expediente.findByPk(id);

    if(!expediente){
        return res.status(404).json({
            msg: 'No existe un edificio con el id' + id
        });
    }

    await expediente.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'expediente Eliminado',
        id,
        expediente
    });

}

