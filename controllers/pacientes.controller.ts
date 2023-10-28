import { Request, Response } from "express";
import Paciente from '../models/paciente';
import Expediente from '../models/expediente';
import MedicoPaciente from "../models/MedicoPaciente";
import Antecedentes_Personales_Patologicos from '../models/AntecedentesPersonalesPatologicos';
import Antecendentes_Personales_No_Patologicos from "../models/AntecedentesPersonalesNoPatologicos";
import AntecedentesHeredoFamiliares from "../models/AntecedentesHeredoFamiliares";
import AntecedentesGinecoObstetrico from "../models/AntecedentesGinecoObstetrico";
import AntecedentesAndrologicos from "../models/AntecedentesAndrologicos";
import Hospitalizacion from '../models/hospitalizacion';
import Inmunizacion from '../models/inmunizacion';
import Otras_Enfermedades from "../models/otrasEnfermedades";
import Antecedentes_Quirurgicos from '../models/AntecedentesQuirurgicos';

export const getPacientes = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const medicoPaciente =  await MedicoPaciente.findAll({ where: {
            id_medico: id,
        }, 
        raw: true
    });

    const pacientes = medicoPaciente.map( (element: any) => element.id_paciente );

    const paciente = await Paciente.findAll({
        include: { 
                model: Expediente
        },
        where: {
            id_paciente: pacientes
        } 
    });

    res.json({
        msg: 'getPacientes',
        paciente
    });

}

export const getAllPacientesAdmin = async( req: Request, res: Response ) => {

    try {
        const pacientes =  await Paciente.findAll({
            raw: true
        });
        
        res.json({
            msg: 'getPacientesAdmin',
            pacientes
        });    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    
}

export const getPaciente = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);

    if( paciente ){

        res.json({
            msg: 'getPaciente',
            paciente
        });
    }
    else{
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postPaciente = async( req: Request, res: Response ) => {

    const { body } = req;

    try {

        const existeEmail = await Paciente.findOne({ 
            where: { 
                correo: body.correo 
            }
        });

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            })
        }

        let paciente: any = Paciente.build(body);
        await paciente.save();
      
        const hospitalizacion: any = Hospitalizacion.build();
        await hospitalizacion.save()

        const antecedentesQuirurgicos: any = Antecedentes_Quirurgicos.build();
        await antecedentesQuirurgicos.save();

        const otrasEnfermedades: any = Otras_Enfermedades.build();
        await otrasEnfermedades.save()

        const inmunizacion: any = Inmunizacion.build();
        await inmunizacion.save();

        const bodyAntecedentesPNP = {
            id_inmunizacion: inmunizacion.id_inmunizacion
        }

        const bodyAntecedentesPP = {
            id_hospitalizacion: hospitalizacion.id_hospitalizacion,
            id_antecedentes_quirurgicos: antecedentesQuirurgicos.id_antecedentes_quirurgicos,
            id_otras_enfermedades: otrasEnfermedades.id_otras_enfermedades
        }

        const antecedentePNP: any = Antecendentes_Personales_No_Patologicos.build(bodyAntecedentesPNP);
        await antecedentePNP.save();

        const antecedentePP: any = Antecedentes_Personales_Patologicos.build(bodyAntecedentesPP);
        await antecedentePP.save();

        const antecedentesHF: any = AntecedentesHeredoFamiliares.build();
        await antecedentesHF.save();

        const idPaciente = paciente.id_paciente; 

        let bodyExpediente= {};

        if(paciente.genero == 'Masculino'){
            const antecedentesAndro: any = AntecedentesAndrologicos.build();
            await antecedentesAndro.save();
            bodyExpediente = {
                id_paciente: idPaciente,
                id_antecedentes_personales_no_patologicos: antecedentePNP.id_antecedentes_personales_no_patologicos,
                id_antecedentes_personales_patologicos: antecedentePP.id_antecedentes_personales_patologicos,
                id_antecedentes_heredo_familiares: antecedentesHF.id_antecedentes_heredo_familiares,
                id_antecedentes_andrologicos: antecedentesAndro.id_antecedentes_andrologicos
            }

        }
        else{
            const antecedentesGO: any = AntecedentesGinecoObstetrico.build();
            await antecedentesGO.save();
            bodyExpediente = {
                id_paciente: idPaciente,
                id_antecedentes_personales_no_patologicos: antecedentePNP.id_antecedentes_personales_no_patologicos,
                id_antecedentes_personales_patologicos: antecedentePP.id_antecedentes_personales_patologicos,
                id_antecedentes_heredo_familiares: antecedentesHF.id_antecedentes_heredo_familiares,
                id_antecedentes_gineco_obstetrico: antecedentesGO.id_antecedentes_gineco_obstetrico
            }
        }
    
        const expediente:any = Expediente.build(bodyExpediente)
        await expediente.save();

        const pacienteFind = await Paciente.findByPk(idPaciente);

        if(pacienteFind){
            await pacienteFind.update({ id_expediente: expediente.id_expediente });
        }
        else{
            res.status(500).json({
                msg: 'Hable con el administrador, no se encontro usuario'
            });
        }

        res.json({ paciente, expediente , antecedentePP , antecedentePNP });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putPaciente = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const paciente = await Paciente.findByPk(id);

        if(!paciente){
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await paciente.update(body);

        res.json( paciente );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deletePaciente = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);

    if(!paciente){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await paciente.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Paciente Eliminado',
        id,
        paciente
    });

}

