import { Request, Response } from "express";
import Cita from '../models/cita';
import Paciente from '../models/paciente';
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import Medico from "../models/medico";
import Medico_Paciente from "../models/MedicoPaciente";

export const getCitas = async( req: Request, res: Response ) => {
    console.log('es aqui')

    const { id } = req.params;

    let date = new Date();

    try {
        const citas = await Cita.findAndCountAll({ 
            include: Paciente, 
            where: {
                fecha_cita: {
                    [Op.eq]: date
                },
                id_medico: id
            },
            order: [
                ['hora_cita', 'ASC']
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

    let date = new Date();
    const citas = await Cita.findAll({ 
        include: [
            { model: Paciente}, 
            { model: Medico }
        ], 
         where: {
            fecha_cita: {
                [Op.eq]: date
            }
        },
        order: [
            ['hora_cita', 'ASC']
        ]
    });

    console.log(citas)

    // let citasActuales = citas.filter( cita => {
    //     let date = new Date();
    //     let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    //     let fechaActual = new Date(date.getTime() - userTimezoneOffset);

    //     let fechaCita = new Date(cita.dataValues.fecha_cita).toISOString();
    //     // console.log(fechaActual,'Fecha actual')
    //     // console.log(new Date(fechaActual),'Fecha actual Offset')

    //     // console.log(new Date(fechaActual).getUTCHours())
    //     // // console.log(fechaActual.toISOString() + ' ---- ' + fechaCita);
    //     // console.log(fechaActual + ' ---- ' + fechaCita);
    //     // console.log(new Date(fechaActual).getDate() + ' ---- ' + new Date(fechaCita).getDate());

    //     if(new Date(fechaActual).getUTCDate() === new Date(fechaCita).getUTCDate() 
    //        && new Date(fechaActual).getUTCMonth() === new Date(fechaCita).getUTCMonth()
    //        && new Date(fechaActual).getUTCFullYear() === new Date(fechaCita).getUTCFullYear()){
    //         return cita;
    //     }
    // });
    // citasActuales = citasActuales.sort((a: any,b: any) => a.fecha_cita - b.fecha_cita);
    res.json({
        msg: 'getCitasAdmin',
        citas
    });

}

export const getTakenSlots = async ( req: Request, res: Response ) => {

   const { date } = req.params;

//    const newDate = new Date(date)
   console.log(date)
    // let selectedDate = new Date(date);
    // let userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    // let newDate = new Date(selectedDate.getTime() - userTimezoneOffset);

    const citas = await Cita.findAll({ 
        where: {
            fecha_cita: {
                [Op.eq]: date
            }
        },
        raw: true
    });
    console.log(citas)

    // let takenSlots = citas.filter( (element: any) => {
    //     if( element.fecha_cita.toISOString().substring(0,10) == new Date(date).toISOString().substring(0,10)){
    //         return element;
    //     }
    // });

    let arrayTakenSlots = citas.map( (element: any) => element.hora_cita);
    
    res.json({
        msg: 'getTakenSlots',
        arrayTakenSlots
    });
}

export const getLastAppoinment = async(req: Request, res: Response) => {
    console.log(req.query)
    const { idPaciente, idMedico } = req.query;

    try {

        const citas: any[] = await Cita.findAll({ 
            where: {
                [Op.and]: [{id_paciente: idPaciente}, {id_medico: idMedico}]
            },
            order: [['fecha_cita','ASC']],
            raw: true
        });

        console.log(citas);

        if(citas.length === 1){
            res.json({
                        msg: 'No se encontro cita previa'
                    });
            return;
        }
    
        const lastAppointment = citas[citas.length - 2]; 
        
        if( lastAppointment ){
            res.json({
                msg: 'get Last Appointment',
                cita: lastAppointment
            });
        }
        else{
            res.status(404).json({
                msg: `No existe una cita con el id ${ lastAppointment.id_cita }`
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
    const { idPaciente, idMedico } = req.query;

    try {
        const citas = await Cita.findAndCountAll({ 
            where: {
                [Op.and]: [{id_paciente: idPaciente}, {id_medico: idMedico}]
            },
            order: [['fecha_cita','DESC']],
            raw: true
        });

        res.json({
            history: citas
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
    const { id_paciente, id_medico } = body;

    let comentarios = '';


    const revision = await Medico_Paciente.findOne({
        attributes: ['id_medico', 'id_paciente'],
        where: {
            [Op.and]: [ {id_paciente}, {id_medico} ]
        }
    })

    console.log(revision)

    if(revision == null){
        const agregar = Medico_Paciente.build({id_medico,id_paciente});
        await agregar.save();
        comentarios = 'Se creo relacion medico paciente';
    }


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
            cita,
            comentarios
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

    try {
        
        const citas = await Cita.findAll({ 
            include: [
                { model: Paciente}, 
                { model: Medico, },
            ],
            where: {
                fecha_cita: {
                    [Op.eq]: fecha
                },
                id_medico: idMedico
            },
            order: [
                ['hora_cita', 'ASC']
            ]
        });

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

export const getAppoinmentsByDateAndType = async(req: Request, res: Response) => {

    const { idMedico,startDate,endDate,type } = req.body;
    console.log(idMedico,startDate,endDate,type)

    let start = new Date(startDate);
    let end = new Date(endDate);
    const startMonth = start.getUTCMonth();
    const endMonth = end.getUTCMonth();
    const startDay = start.getUTCDate()
    const endDay = end.getUTCDate()

    const firstDate = new Date(start.getFullYear(),startMonth,startDay,0-7);
    const lastDate = new Date(end.getFullYear(),endMonth,endDay + 1,0-7);

    try {
        const citas = await Cita.findAndCountAll({ 
            attributes: ['motivo_consulta', 'estatus','fecha_cita'],
            include: { model: Paciente, attributes: ['nombre', 'apellidos']},
            where: {
                fecha_cita: {
                    [Op.and]: [{ [Op.gte]: firstDate },{ [Op.lt]: lastDate }],
                },
                motivo_consulta: type,
                id_medico: idMedico
            }
        });

        res.json({
            msg: 'getCitasByDateAndType',
            citas
        });
        
    } catch (error) {
        res.json({
            msg: 'Hable con el administrador'
        });
    }

}

