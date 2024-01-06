
import { Request, Response } from "express";
import Procedimientos from '../models/procedimientos';
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import Paciente from '../models/paciente';
import Quirofano from "../models/quirofano";
import Medico from "../models/medico";

export const getProcedimientos = async (req: Request, res: Response ) => {

    const { selectedDate } = req.params; 
    console.log(selectedDate)
    let date = new Date();

    if(selectedDate != 'null'){
        date = new Date(selectedDate);
    }

    
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    let correctedDate = new Date(date.getTime() - userTimezoneOffset);
    correctedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0-7,0,0);


    const day = correctedDate.getUTCDate() + 1;
    const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);

    const procedimientos = await Procedimientos.findAndCountAll({
        include: [
            { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
            { model: Medico, attributes: ['id_medico','nombre','apellidos']}
        ],
        
        where: {
            fecha_procedimiento: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            }
        },
        order: [
            ['fecha_procedimiento', 'ASC']
        ],
        attributes: [
            'id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento'
        ]
    });
    
    res.json({
        msg: 'getCurrentProceduresDoctor',
        procedimientos
    });
}

export const postProcedimiento = async (req: Request, res: Response ) => {

    const { body } = req;
    console.log(body)
    try {
        const procedimientoNuevo = await Procedimientos.findOne({ 
            where: { 
                fecha_procedimiento: {
                    [Op.like]: moment(body.fecha_procedimiento, "YYYY MM DD hh:mm:ss")
                }  
            }
        });

        console.log(procedimientoNuevo)

        if(procedimientoNuevo){ 
            return res.status(400).json({
                msg: 'El horario seleccionado no se encuentra disponible, favor de seleccionar otro'
            });
        }

        const procedimiento = Procedimientos.build(body);
        await procedimiento.save();
        res.status(200).json({
            msg: 'Guardado con exito',
            procedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putProcedimiento = async (req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;
    console.log(body,id,'parametros')

    try {

        const procedimiento = await Procedimientos.findByPk(id);

        if(!procedimiento){
            return res.status(404).json({
                msg: 'No existe una cita con el id ' + id
            })
        }

        const verificarHorario = await Procedimientos.findOne({ 
            where: { 
                fecha_procedimiento: {
                    [Op.like]: moment(body.fecha_procedimiento, "YYYY MM DD hh:mm:ss")
                }  
            }
        });

        console.log(verificarHorario)

        if(verificarHorario){ 
            return res.status(400).json({
                msg: 'El horario seleccionado no se encuentra disponible, favor de seleccionar otro'
            });
            
        }

        await procedimiento.update(body);

        res.json({
            msg: 'cita Editada',
            procedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteProcedimiento = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const procedimiento = await Procedimientos.findByPk(id);

    if(!procedimiento){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    // await procedimiento.update({ estado: false });
    await procedimiento.destroy();

    res.json({
        msg: 'Procedimiento Eliminado',
        id,
        procedimiento
    });

}

export const getProceduresByDay = async ( req: Request, res: Response ) => {

    const { date, idQuirofano } = req.params;

    let selectedDate = new Date(date);
    let userTimezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    let correctedDate = new Date(selectedDate.getTime() - userTimezoneOffset);

    const day = correctedDate.getUTCDate() + 1;
    const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);

    const procedimientos = await Procedimientos.findAll({ 
        raw: true,
        where: {
            fecha_procedimiento: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_quirofano: idQuirofano
        },
        order: [
            ['fecha_procedimiento', 'ASC']
        ],
        attributes: [
            'id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento'
        ]
    });
    
    res.json({
        msg: 'getProceduresByDay',
        procedimientos,
        row: procedimientos.length
    });
 }

 export const getCurrentProceduresDoctor = async ( req: Request, res: Response ) => {

    const { idMedico } = req.params;
    console.log(idMedico)

    let today = new Date();
    let userTimezoneOffset = today.getTimezoneOffset() * 60000;
    let correctedDate = new Date(today.getTime() - userTimezoneOffset);
    correctedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0-7,0,0);


    const day = correctedDate.getUTCDate() + 1;
    const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);

    const procedimientos = await Procedimientos.findAndCountAll({
        include: [
            { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] }
        ],
        
        where: {
            fecha_procedimiento: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_medico: idMedico
        },
        order: [
            ['fecha_procedimiento', 'ASC']
        ],
        attributes: [
            'id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento'
        ]
    });
    
    res.json({
        msg: 'getCurrentProceduresDoctor',
        procedimientos
    });
 }

 export const getProceduresCalendarDoctor = async ( req: Request, res: Response ) => {

    const { idMedico, date } = req.params;
  
    let today = new Date(date);
    let userTimezoneOffset = today.getTimezoneOffset() * 60000;
    let correctedDate = new Date(today.getTime() - userTimezoneOffset);
    correctedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0-7,0,0);

    const day = correctedDate.getUTCDate() + 1;
    const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);

    const procedimientos = await Procedimientos.findAndCountAll({
        include: [
            { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] }
        ],
        
        where: {
            fecha_procedimiento: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_medico: idMedico
        },
        order: [
            ['fecha_procedimiento', 'ASC']
        ],
        attributes: [
            'id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento'
        ]
    });
    
    res.json({
        msg: 'getProceduresCalendarDoctor',
        procedimientos
    });
 }

 export const getProceduresMonthDoctor = async(req: Request, res: Response) => {

    const { idMedico } = req.params;

    let date = new Date();
    const month = date.getUTCMonth()
    const firstDate = new Date(date.getFullYear(),month,1,0-7);
    const lastDate = new Date(date.getFullYear(),month + 1,0,0-7);

    try {
        const procedimientos = await Procedimientos.count({ 
            where: {
                fecha_procedimiento: {
                    [Op.and]: [{ [Op.gte]: firstDate },{ [Op.lt]: lastDate }],
                },
                id_medico: idMedico
            }
        });

        res.json({
            msg: 'getProceduresMonthDoctor',
            procedimientos
        });
        
    } catch (error) {
        res.json({
            msg: 'Hable con el administrador'
        });
    }

}

export const getProceduresCalendarAdmin = async ( req: Request, res: Response ) => {

    const { idMedico, date } = req.params;
  
    let today = new Date(date);
    let userTimezoneOffset = today.getTimezoneOffset() * 60000;
    let correctedDate = new Date(today.getTime() - userTimezoneOffset);
    correctedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0-7,0,0);

    const day = correctedDate.getUTCDate() + 1;
    const dayPlus = new Date(correctedDate.getUTCFullYear(),correctedDate.getUTCMonth(), day,0-7);

    const procedimientos = await Procedimientos.findAndCountAll({
        include: [
            { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
            { model: Medico, attributes: ['id_medico','nombre','apellidos'] }
        ],
        
        where: {
            fecha_procedimiento: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_medico: idMedico
        },
        order: [
            ['fecha_procedimiento', 'ASC']
        ],
        attributes: [
            'id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento'
        ]
    });
    
    res.json({
        msg: 'getProceduresCalendarDoctor',
        procedimientos
    });
 }