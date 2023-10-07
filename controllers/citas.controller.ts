import { Request, Response } from "express";
import Cita from '../models/cita';
import Paciente from '../models/paciente';
import { Op } from "sequelize";
import moment from "moment";

export const getCitas = async( req: Request, res: Response ) => {

    const citas = await Cita.findAll({ include: Paciente });

    let citasActuales = citas.filter( cita => {
        let date = new Date(new Date().toISOString());
        let userTimezoneOffset = date.getTimezoneOffset() * 60000;
        let fechaActual = new Date(date.getTime() - userTimezoneOffset);
        // console.log(fechaActual.toUTCString())

        let fechaCita = new Date(cita.dataValues.fecha_cita).toISOString();

        console.log(fechaActual.toUTCString() + ' ---- ' + fechaCita);
        if(new Date(fechaActual).getDate() === new Date(fechaCita).getDate() 
           && fechaActual.getMonth() === new Date(fechaCita).getMonth()
           && fechaActual.getMonth() === new Date(fechaCita).getMonth()){
            return cita;
        }

        // cita.dataValues.fecha_cita = new Date(cita.dataValues.fecha_cita).toISOString(); 
    });
    console.log(citasActuales);
    res.json({
        msg: 'getCitas',
        citasActuales
    });

}

export const getTakenSlots = async ( req: Request, res: Response ) => {

    let actualDate = new Date();
    let userTimezoneOffset = actualDate.getTimezoneOffset() * 60000;
    new Date(actualDate.getTime() - userTimezoneOffset);

    const citas = await Cita.findAll({ raw: true});
    
    let takenSlots = citas.filter( (element: any) => {
        if( element.fecha_cita.toISOString().substring(0,10) == actualDate.toISOString().substring(0,10)){
            return element;
        }
    });

    let arrayTakenSlots = takenSlots.map( (element: any) => element.fecha_cita);

    console.log(arrayTakenSlots);

    res.json({
        msg: 'getTakenSlots',
        arrayTakenSlots
    });
}

export const getCita = async( req: Request, res: Response ) => {

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
        //TODO: Checar fecha y hora
        const citaNueva = await Cita.findOne({ 
            where: { 
                fecha_cita: {
                    [Op.like]: moment(body.fecha_cita, "YYYY MM DD hh:mm:ss")
                }  
            }
        });

        console.log(citaNueva)

        if(citaNueva !== null){
            return res.status(400).json({
                msg: 'Ya existe una cita con el horario seleccionado, favor de seleccionar otro horario'
            })
        }

        const cita = Cita.build(body);
        await cita.save();
        res.json( cita );
        
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

