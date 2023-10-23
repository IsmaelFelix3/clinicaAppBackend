import { Request, Response } from "express";
import Expediente from '../models/expediente';
import AntecedentePP from "../models/AntecedentesPersonalesPatologicos";
import AntecedentePNP from "../models/AntecedentesPersonalesNoPatologicos";
import AntecedenteAndro from "../models/AntecedentesAndrologicos";
import AntecedenteHF from "../models/AntecedentesHeredoFamiliares";
import AntecedenteGO from "../models/AntecedentesGinecoObstetrico";
import Inmunizacion from "../models/inmunizacion";
import Hospitalizacion from "../models/hospitalizacion";
import Quirurgicos from "../models/AntecedentesQuirurgicos";
import OtrasEnfermedades from "../models/otrasEnfermedades";
import { ExpedienteBody } from "../interfaces/Expediente.interface";

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
    const body: ExpedienteBody  = req.body;

    console.log(body,'body')

    const bodyGeneral = {
        id_expediente: body.idExpediente,
        id_paciente: body.idPaciente,
        fecha_creacion_expediente: body.fechaCreacionExpediente,
        edad_paciente: body.edadPaciente,
        alergias: body.alergias,
        tipo_sanguineo: body.tipoSanguineo,
        id_antecedentes_heredo_familiares: body.idAntecedentesHeredoFamiliares,
        id_antecedentes_personales_patologicos: body.idAntecedentesPersonalesPatologicos,
        id_antecedentes_personales_no_patologicos: body.idAntecedentesPersonalesNoPatologicos, 
        id_antecedentes_andrologicos: body.idAntecedentesAndrologicos,
        id_antecedentes_gineco_obstetrico: body.idAntecedentesGinecoObstetrico
    }

    const bodyAntecedentesPP = {
        id_antecedentes_personales_patologicos: body.idAntecedentesPersonalesPatologicos,
        enfermedades_infantiles: body.enfermedadesInfantiles,
        secuelas: body.secuelas,
        id_hospitalizacion: body.idHospitalizacion,
        id_antecedentes_quirurgicos: body.idQuirurgicos,
        id_otras_enfermedades: body.idOtrasEnfermedades
    }

    const bodyAntecedentesPNP = {
        id_antecedentes_personales_no_patologicos: body.idAntecedentesPersonalesNoPatologicos,
        fumador: body.fumador,
        alcohol: body.alcohol,
        drogas: body.drogas,
        diabetes: body.diabetes,
        id_inmunizacion: body.idInmunizacion,
        otros: body.otros
    }
    const bodyAntecedentesHF = {
        id_antecedentes_heredo_familiares: body.idAntecedentesHeredoFamiliares,
        diabetes: body.diabetesHF,
        hipertension_arterial: body.hipertensionArterial,
        cancer: body.cancer,
        tipo_cancer: body.tipoCancer,
        familiar_cancer: body.familiarCancer,
        cardiopatas: body.cardiopatas,
        familiar_cardiopatas: body.familiarCardiopatas,
        nefropatas: body.nefropatas,
        familiar_nefropatas: body.familiarNefropatas,
        descripcion_malformaciones: body.descripcionMalformaciones
    }

    let bodyAntecedentesGO = {}
    let bodyAntecedentesAndro = {};

    if(body.genero === 'Femenino'){
            bodyAntecedentesGO = {
            id_antecedentes_gineco_obstetrico: body.idAntecedentesGinecoObstetrico,
            menarca: body.menarca,
            ciclo_menstrual: body.cicloMenstrual,
            vsa: body.vsaGO,
            numero_parejas: body.numeroParejasGO,
            numero_embarazos: body.numeroEmbarazos,
            numero_partos: body.numeroPartos,
            abortos: body.abortos,
            cesareas: body.cesareas,
            metodo_anticonceptivo: body.metodoAnticonceptivo,
            fecha_ultima_menstruacion: body.fechaUltimaMenstruacion,
            ets: body.etsGO,
            menopausia: body.menopausia,
            papanicolau: body.papanicolau,
            lactancia_materna: body.lactanciaMaterna
        }
    }
    else{
            bodyAntecedentesAndro = {
            id_antecedentes_andrologicos: body.idAntecedentesAndrologicos,
            circuncision: body.circuncision,
            criptorquidia: body.criptorquidia,
            vsa: body.vsa,
            numero_parejas: body.numeroParejas,
            ets: body.ets,
            transtorno_ereccion: body.transtornoEreccion,
            andropausia: body.andropausia
        }
    }

    const bodyHospitalizaciones = {
        id_hospitalizacion: body.idHospitalizacion,
        descripcion_hospitalizacion: body.hospitalizacion
    }

    const bodyInmunizaciones = {
        id_inmunizacion: body.idInmunizacion,
        descripcion_inmunizacion: body.inmunizacion
    }

    const bodyOtrasEnfermedades = {
        id_otras_enfermedades: body.idInmunizacion,
        descripcion_otras_enfermedades: body.otrasEnfermedades
    }

    const bodyQuirurgicos = {
        id_antecedentes_quirurgicos: body.idQuirurgicos,
        descripcion_antecedente_quirurgico: body.quirurgicos
    }

    try {
        const expediente = await Expediente.findByPk(id);
        const antecedentesPP = await AntecedentePP.findByPk(body.idAntecedentesPersonalesPatologicos);
        const antecedentesPNP = await AntecedentePNP.findByPk(body.idAntecedentesPersonalesNoPatologicos);
        const antecedentesHF = await AntecedenteHF.findByPk(body.idAntecedentesHeredoFamiliares);
        const inmunizacion = await Inmunizacion.findByPk(body.idInmunizacion);
        const hospitalizacion =  await Hospitalizacion.findByPk(body.idHospitalizacion);
        const quirurgicos = await Quirurgicos.findByPk(body.idQuirurgicos);
        const otrasEnfermedades = await OtrasEnfermedades.findByPk(body.idOtrasEnfermedades);
        let antecedentesGO;
        let antecedentesAndro;

        if(!expediente){
            return res.status(404).json({
                msg: 'No existe un expediente con el id ' + id
            });
        }

        if(!antecedentesPP){
            return res.status(404).json({
                msg: 'No existe un antecedente PP con el id ' + body.idAntecedentesPersonalesPatologicos
            });
        }

        if(!antecedentesPNP){
            return res.status(404).json({
                msg: 'No existe un antecedente PNP con el id ' + body.idAntecedentesPersonalesNoPatologicos
            });
        }

        if(!antecedentesHF){
            return res.status(404).json({
                msg: 'No existe un antecedente Heredo familiar con el id ' + body.idAntecedentesHeredoFamiliares
            });
        }

        if(!inmunizacion){
            return res.status(404).json({
                msg: 'No existe un registro de inmunizacion con el id ' + body.idInmunizacion
            });
        }

        if(!hospitalizacion){
            return res.status(404).json({
                msg: 'No existe registro de hospitalizacion con el id ' + body.idHospitalizacion
            });
        }

        if(!quirurgicos){
            return res.status(404).json({
                msg: 'No existe un antecedente quirurgico con el id ' + body.idQuirurgicos
            });
        }

        if(!otrasEnfermedades){
            return res.status(404).json({
                msg: 'No existe registro de otras enfermedades con el id ' + body.idOtrasEnfermedades
            });
        }

        await expediente.update(bodyGeneral, {
            where: {
                id_expediente: bodyGeneral.id_expediente
            }
        });

        await antecedentesPP.update(bodyAntecedentesPP, {
            where: {
                id_antecedentes_personales_patologicos: bodyGeneral.id_antecedentes_personales_patologicos
            }
        });

        await antecedentesPNP.update(bodyAntecedentesPNP, {
            where: {
                id_antecedentes_personales_no_patologicos: bodyGeneral.id_antecedentes_personales_no_patologicos
            }
        });

        await antecedentesHF.update(bodyAntecedentesHF, {
            where: {
                id_antecedentes_heredo_familiares: bodyGeneral.id_antecedentes_heredo_familiares
            }
        });

        await inmunizacion.update( bodyInmunizaciones, {
            where: {
                id_inmunizacion: body.idInmunizacion
            }
        });

        await hospitalizacion.update( bodyHospitalizaciones, {
            where: {
                id_hospitalizacion: body.idHospitalizacion
            }
        });

        await quirurgicos.update( bodyQuirurgicos, {
            where: {
                id_antecedentes_quirurgicos: body.idQuirurgicos
            }
        });

        await otrasEnfermedades.update( bodyOtrasEnfermedades, {
            where: {
                id_otras_enfermedades: body.idOtrasEnfermedades
            }
        });
        
        if(body.genero === 'Femenino'){
            antecedentesGO = await AntecedenteGO.findByPk(body.idAntecedentesGinecoObstetrico);
            if(!antecedentesGO){
                return res.status(404).json({
                    msg: 'No existe un antecedente Gineco Obstetrico con el id ' + body.idAntecedentesGinecoObstetrico
                });
            }
            await antecedentesGO?.update( bodyAntecedentesGO, {
                where: {
                    id_antecedentes_gineco_obstetrico: body.idAntecedentesGinecoObstetrico
                }
            })
        }
        else{
            antecedentesAndro = await AntecedenteAndro.findByPk(body.idAntecedentesAndrologicos);
            if(!antecedentesAndro){
                return res.status(404).json({
                    msg: 'No existe un antecedente andrologico con el id ' + body.idAntecedentesAndrologicos
                });
            }
            await antecedentesAndro?.update(bodyAntecedentesAndro, {
                where: {
                    id_antecedentes_andrologicos: body.idAntecedentesAndrologicos
                }
            });
        }
        res.json({
            msg: 'Se actualizo el expediente medico.'
        });
        
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

