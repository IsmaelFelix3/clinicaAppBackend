import { Request, Response } from "express";
import Cita from '../models/cita';
import Paciente from '../models/paciente';
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import Medico from "../models/medico";

export const getCitas = async( req: Request, res: Response ) => {

    const { id } = req.params;

    let date = new Date();
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    let fechaActual = new Date(date.getTime() - userTimezoneOffset);
    fechaActual = new Date (fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate(),0-7)

    const day = fechaActual.getUTCDate() + 1;
    const dayPlus = new Date(fechaActual.getUTCFullYear(),fechaActual.getUTCMonth(), day,0-7);

    console.log(fechaActual)
    console.log(dayPlus)

    try {

        const citas = await Cita.findAndCountAll({ 
            include: Paciente, 
            where: {
                fecha_cita: {
                    [Op.and]: [{ [Op.gte]: fechaActual },{ [Op.lt]: dayPlus }],
                },
                id_medico: id
            },
            order: [
                ['fecha_cita', 'ASC']
            ]
        });

        res.json({
            msg: 'getCitas',
            citas: citas.rows,
            numCitas: citas.count
        });
        
    } catch (error) {
        res.json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getCitasAdmin = async( req: Request, res: Response ) => {

    const citas = await Cita.findAll({ 
        include: [
            { model: Paciente}, 
            { model: Medico }
        ]
    });

    let citasActuales = citas.filter( cita => {
        let date = new Date();
        let userTimezoneOffset = date.getTimezoneOffset() * 60000;
        let fechaActual = new Date(date.getTime() - userTimezoneOffset);

        let fechaCita = new Date(cita.dataValues.fecha_cita).toISOString();
        // console.log(fechaActual,'Fecha actual')
        // console.log(new Date(fechaActual),'Fecha actual Offset')

        // console.log(new Date(fechaActual).getUTCHours())
        // // console.log(fechaActual.toISOString() + ' ---- ' + fechaCita);
        // console.log(fechaActual + ' ---- ' + fechaCita);
        // console.log(new Date(fechaActual).getDate() + ' ---- ' + new Date(fechaCita).getDate());

        if(new Date(fechaActual).getUTCDate() === new Date(fechaCita).getUTCDate() 
           && new Date(fechaActual).getUTCMonth() === new Date(fechaCita).getUTCMonth()
           && new Date(fechaActual).getUTCFullYear() === new Date(fechaCita).getUTCFullYear()){
            return cita;
        }
    });
    citasActuales = citasActuales.sort((a: any,b: any) => a.fecha_cita - b.fecha_cita);
    res.json({
        msg: 'getCitasAdmin',
        citasActuales
    });

}

export const getTakenSlots = async ( req: Request, res: Response ) => {

   const { date } = req.params;
    let selectedDate = new Date(date);
    let userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    let newDate = new Date(selectedDate.getTime() - userTimezoneOffset);

    const citas = await Cita.findAll({ raw: true});

    let takenSlots = citas.filter( (element: any) => {
        if( element.fecha_cita.toISOString().substring(0,10) == newDate.toISOString().substring(0,10)){
            return element;
        }
    });

    let arrayTakenSlots = takenSlots.map( (element: any) => element.fecha_cita);

    res.json({
        msg: 'getTakenSlots',
        arrayTakenSlots
    });
}

export const getLastAppoinment = async(req: Request, res: Response) => {
    const { idPaciente } = req.params;

    try {

        const citas: any[] = await Cita.findAll({ 
            where: {
                id_paciente: idPaciente
            },
            raw: true
        });
    
        let citasDates = citas.map(element => {
            return { id: element.id_cita, date: new Date(element.fecha_cita) }
        });
    
        let sorted = citasDates.sort((a: any,b: any) => b.date - a.date);

        console.log(sorted)
    
        const idCita = sorted[1].id; 
    
        const cita = await Cita.findByPk(idCita);
    
        if( cita ){
    
            res.json({
                msg: 'get Last Appoinment',
                cita
            });
        }
        else{
            res.status(404).json({
                msg: `No existe una cita con el id ${ idCita }`
            });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getAppoinmentsHistory = async ( req: Request, res: Response ) => {
    const { idPaciente } = req.params;

    try {

        const citas: any[] = await Cita.findAll({ 
            where: {
                id_paciente: idPaciente
            },
            raw: true
        });
    
        let citasDates = citas.map(element => {
            return { id: element.id_cita, date: new Date(element.fecha_cita) }
        });
    
        let sorted = citasDates.sort((a: any,b: any) => b.date - a.date);
        const sortedIds = sorted.map( (element: any) => element.id );
    
        const history = await Cita.findAndCountAll({
            where:{
                id_cita: sortedIds
            },
            raw: true,
            order: [
                ['fecha_cita', 'DESC']
            ]
        });
    
        res.json({
            history
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getCitaById = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const cita = await Cita.findByPk(id);

    if( cita ){

        res.json({
            msg: 'getCita',
            cita
        });
    }
    else{
        res.status(404).json({
            msg: `No existe una cita con el id ${ id }`
        });
    }
}


export const postCita = async( req: Request, res: Response ) => {

    const { body } = req;

    try {
        const citaNueva = await Cita.findOne({ 
            where: { 
                fecha_cita: {
                    [Op.like]: moment(body.fecha_cita, "YYYY MM DD hh:mm:ss")
                }  
            }
        });

        console.log(citaNueva)

        if(citaNueva){ 
            return res.status(400).json({
                msg: 'Ya existe una cita con el horario seleccionado, favor de seleccionar otro horario'
            });
            
        }

        const cita = Cita.build(body);
        await cita.save();
        res.status(200).json({
            msg: 'Guardado con exito',
            cita
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putCita = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;
    console.log(body,id,'parametros')

    try {

        const cita = await Cita.findByPk(id);

        if(!cita){
            return res.status(404).json({
                msg: 'No existe una cita con el id ' + id
            })
        }

        // const usuario = new Usuario(body);
        // si hubiera campos que no estan declarados en el modelo son ignorados 
        await cita.update(body);

        res.json( cita );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const putCitaFecha = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;
    console.log(body,id,'parametros')

    try {

        const cita = await Cita.findByPk(id);

        if(!cita){
            return res.status(404).json({
                msg: 'No existe una cita con el id ' + id
            })
        }

        const citaNueva = await Cita.findOne({ 
            where: { 
                fecha_cita: {
                    [Op.like]: moment(body.fecha_cita, "YYYY MM DD hh:mm:ss")
                }  
            }
        });

        console.log(citaNueva)

        if(citaNueva){ 
            return res.status(400).json({
                msg: 'Ya existe una cita con el horario seleccionado, favor de seleccionar otro horario'
            });
            
        }

        await cita.update(body);

        res.json( cita );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const deleteCita = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const cita = await Cita.findByPk(id);

    if(!cita){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await cita.update({ estado: false });
    // await usuario.destroy();

    res.json({
        msg: 'Usuario Eliminado',
        id,
        cita
    });

}

export const appoinmentsByMedicAndDate = async(req: Request, res: Response) => {
    
    const { idMedico, fecha } = req.body;

    let selectedDate = new Date(fecha);
    let userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    let correctedDate = new Date(selectedDate.getTime() - userTimezoneOffset);

    const day = correctedDate.getUTCDate() + 1;
    const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);

    try {
        
        const citas = await Cita.findAll({ 
            include: [
                { model: Paciente}, 
                { model: Medico, },
            ],
            where: {
                fecha_cita: {
                    [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
                },
                id_medico: idMedico
            },
            order: [
                ['fecha_cita', 'ASC']
            ]
        });

    //     let citasDelDia = citas.filter( cita => {
    //         let date = new Date();
    //         let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    //         let fechaActual = new Date(date.getTime() - userTimezoneOffset);
    
    //         let fechaCita = new Date(cita.dataValues.fecha_cita).toISOString();
    
    //         if(new Date(fechaActual).getUTCDate() === new Date(fechaCita).getUTCDate() 
    //            && new Date(fechaActual).getUTCMonth() === new Date(fechaCita).getUTCMonth()
    //            && new Date(fechaActual).getUTCFullYear() === new Date(fechaCita).getUTCFullYear()){
    //             return cita;
    //         }
    //     });
    //     citasDelDia = citasDelDia.sort((a: any,b: any) => a.fecha_cita - b.fecha_cita);

        res.json({
            msg: 'getCitasByMedicAndDate',
            citas
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }
}

export const getAppoinmentsByDate = async(req: Request, res: Response) => {
    const { date } = req.params;

    try {
        let selectedDate = new Date(date);

        let userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;
        let correctedDate = new Date(selectedDate.getTime() - userTimezoneOffset);
    
        const day = correctedDate.getUTCDate() + 1;
        const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);
    
    
        const citas = await Cita.findAll({ 
            include: [
                { model: Paciente}, 
                { model: Medico, },
            ],
            where: {
                fecha_cita: {
                    [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }]
                }
            },
            order: [
                ['fecha_cita', 'ASC']
            ]
        });
    
        res.json({
            msg: 'Citas by Date',
            citas
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getAppoinmentsMonth = async(req: Request, res: Response) => {

    const { id } = req.params;

    let date = new Date();
    const month = date.getUTCMonth()
    const firstDate = new Date(date.getFullYear(),month,1,0-7);
    const lastDate = new Date(date.getFullYear(),month + 1,0,0-7);

    try {
        const citas = await Cita.count({ 
            where: {
                fecha_cita: {
                    [Op.and]: [{ [Op.gte]: firstDate },{ [Op.lt]: lastDate }],
                },
                id_medico: id
            }
        });

        res.json({
            msg: 'getCitasByMonth',
            citas
        });
        
    } catch (error) {
        res.json({
            msg: 'Hable con el administrador'
        });
    }

}

