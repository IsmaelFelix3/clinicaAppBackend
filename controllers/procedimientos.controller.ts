
import { Request, Response } from "express";
import Procedimientos from '../models/procedimientos';
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";

export const getProcedimientos = async (req: Request, res: Response ) => {
    try {
        const admin = await Procedimientos.findAndCountAll();
        res.json( {
            msg: 'get procedimientos',
            admin
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
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

    // let takenSlots = procedimientos.filter( (element: any) => {
    //     if( element.fecha_procedimiento.toISOString().substring(0,10) == correctedDate.toISOString().substring(0,10)){
    //         return element;
    //     }
    // });

    // let arrayTakenSlots = takenSlots.map( (element: any) => element.fecha_procedimiento);

    res.json({
        msg: 'getTakenSlots',
        procedimientos
        // arrayTakenSlots
    });
 }