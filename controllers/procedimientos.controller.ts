
import { Request, Response } from "express";
import Procedimientos from '../models/procedimientos';
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import Paciente from '../models/paciente';
import Quirofano from "../models/quirofano";
import Medico from "../models/medico";
import Catalogo_Procedimientos from "../models/CatalogoProcedimiento";
import Catalogo_Banco from "../models/banco";
import Catalogo_Forma_Pago from "../models/formaPago";
import MedicoPaciente from "../models/MedicoPaciente";
import sequelize from "sequelize/types/sequelize";

export const getProcedimiento = async (req: Request, res: Response) => {
    const { id } = req.params; 
    try {

        const procedimiento = await Procedimientos.findByPk(id, {
            attributes: [ 'serie','fecha_procedimiento_inicio', 'fecha_procedimiento_fin', 'estatus', 'detalles' ],
            include: [
                { model: Paciente, attributes: ['id_paciente','nombre','apellidos'] },
                { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
                { model: Medico, attributes: ['id_medico','nombre','apellidos']},
                { model: Catalogo_Procedimientos, attributes: ['id_procedimiento','nombre_procedimiento'] }
            ],
            raw: true 
        });


        res.json({
            msg: 'getProcedure',
            procedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getProcedimientos = async (req: Request, res: Response ) => {

    const { selectedDate } = req.params; 
    console.log(selectedDate)
    let date = new Date().toUTCString();

    if(selectedDate != 'null'){
        date = new Date(selectedDate).toUTCString();
    }

    console.log(date)


    const day = new Date(date).getUTCDate() + 1;
    const newDate = new Date(new Date(date).getUTCFullYear(),new Date(date).getUTCMonth(), day - 1 ,0-7)
    const dayPlus = new Date(new Date(date).getUTCFullYear(),new Date(date).getUTCMonth(), day,0-7);


    const procedimientos = await Procedimientos.findAndCountAll({
        include: [
            { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
            { model: Medico, attributes: ['id_medico','nombre','apellidos']},
            { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] }
        ],
        
        where: {
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: newDate },{ [Op.lt]: dayPlus }],
            }
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 'fecha_procedimiento_fin', 'id_procedimiento', 'estatus'
        ]
    });
    
    res.json({
        msg: 'getCurrentProceduresDoctor',
        procedimientos
    });
}

export const postProcedimiento = async (req: Request, res: Response ) => {

    const { body } = req;

    console.log('body-------')
    console.log(body)
    try {
        // const procedimientoNuevo = await Procedimientos.findOne({ 
        //     where: {
        //         id_quirofano: body.operatingRoom,
        //         fecha_procedimiento_inicio: {
        //             [Op.like]: moment(body.fecha_procedimiento_inicio, "YYYY MM DD hh:mm:ss")
        //         }  
        //     }
        // });

        
        /*let userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
        console.log('userTimezoneOffset------')
        console.log(userTimezoneOffset)
        let startDateCorrected = new Date(new Date(body.startDate).getTime() - userTimezoneOffset);
        let endDateCorrected = new Date(new Date(body.endDate).getTime() - userTimezoneOffset);*/
        
        const reserva = {
            serie: body.serie,
            id_medico: body.doctor,
            id_paciente: body.patient,
            id_quirofano: body.operatingRoom,
            fecha_procedimiento_inicio: body.startDate,
            fecha_procedimiento_fin: body.endDate,
            id_procedimiento: body.procedure,
            estatus: body.status,
            detalles: body.details
        }
         //correctedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0-7,0,0);
 
         const procedimientoNuevo = await Procedimientos.findOne({ 
                where: {
                    estatus: {
                        [Op.ne]: 'Cancelado'
                    },
                    id_quirofano: body.operatingRoom,
                    fecha_procedimiento_inicio: {
                        [Op.eq]: body.startDate
                    },
                    fecha_procedimiento_fin: {
                        [Op.eq]: body.endDate
                    }
                }
         });


        if(procedimientoNuevo){ 
            return res.status(400).json({
                msg: 'El horario seleccionado no se encuentra disponible, favor de seleccionar otro'
            });
        }

        const procedimiento = Procedimientos.build(reserva);
        await procedimiento.save();
        res.status(200).json({
            msg: 'Guardado con exito',
            procedimiento,
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

       /* let userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
        let startDateCorrected = new Date(new Date(body.startDate).getTime() - userTimezoneOffset);
        let endDateCorrected = new Date(new Date(body.endDate).getTime() - userTimezoneOffset);*/

        const procedimiento = await Procedimientos.findByPk(id);

        if(!procedimiento){
            return res.status(404).json({
                msg: 'No existe una cita con el id ' + id
            })
        }

        const verificarHorario = await Procedimientos.findOne({ 
            where: { 
                id_reserva: {
                    [Op.ne]: id
                },
                estatus: {
                    [Op.ne]: 'Cancelado'
                },
                id_quirofano: body.operatingRoom,
                fecha_procedimiento_inicio: {
                    [Op.eq]: body.startDate
                },
                fecha_procedimiento_fin: {
                    [Op.eq]: body.endDate
                }
            }
        });

        console.log(verificarHorario)

        if(verificarHorario){ 
            return res.status(400).json({
                msg: 'El horario seleccionado no se encuentra disponible, favor de seleccionar otro'
            });
            
        }

        const reserva = {
            id_medico: body.doctor,
            id_paciente: body.patient,
            id_quirofano: body.operatingRoom,
            fecha_procedimiento_inicio: body.startDate,
            fecha_procedimiento_fin: body.endDate,
            id_procedimiento: body.procedure,
            estatus: body.status,
            detalles: body.details
        }

        await procedimiento.update(reserva);

        res.json({
            msg: 'Procedimiento Editado',
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

    await procedimiento.update({ estatus: 'Cancelado' });
    // await procedimiento.destroy();

    res.json({
        msg: `Procedimiento eliminado con exito`
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
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_quirofano: idQuirofano
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio'
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
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_medico: idMedico
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio'
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
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano', 'color'] },
            { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] }
        ],
        
        where: {
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_medico: idMedico
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 'fecha_procedimiento_fin', 'estatus', 'id_procedimiento'
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
                fecha_procedimiento_inicio: {
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

export const getProceduresMonth = async(req: Request, res: Response) => {

    let date = new Date();
    const month = date.getUTCMonth()
    const firstDate = new Date(date.getFullYear(),0,1,0-7);
    const lastDate = new Date(date.getFullYear(),11 + 1,0,0-7);

    try {
        const procedimientos = await Procedimientos.findAll({ 
            include: [
                { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
                { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano', 'color'] },
                { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] },
                { model: Medico, attributes: ['id_medico','nombre','apellidos']},
            ],
            where: {
                estatus: {
                    [Op.ne]: 'Cancelado'
                },
                fecha_procedimiento_inicio: {
                    [Op.and]: [{ [Op.gte]: firstDate },{ [Op.lt]: lastDate }],
                }
            },
            order: [
                ['fecha_procedimiento_inicio', 'ASC']
            ],
            attributes: [
                'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 'fecha_procedimiento_fin', 'estatus', 'id_procedimiento'
            ]
        });

        res.json({
            msg: 'getProceduresMonth',
            procedimientos
        });
        
    } catch (error) {
        res.json({
            msg: 'Hable con el administrador'
        });
    }

}

export const getProceduresDoctorFC = async(req: Request, res: Response) => {

    const { idMedico } = req.params;

    let date = new Date();
    const month = date.getUTCMonth()
    const firstDate = new Date(date.getFullYear(),0,1,0-7);
    const lastDate = new Date(date.getFullYear(),11 + 1,0,0-7);
    console.log(firstDate)
    console.log(lastDate)


    try {
        const procedimientos = await Procedimientos.findAll({ 
            include: [
                { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
                { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano', 'color'] },
                { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] },
                { model: Medico, attributes: ['id_medico','nombre','apellidos']},
            ],
            where: {
                id_medico: {
                    [Op.eq]: idMedico
                },
                estatus: {
                    [Op.ne]: 'Cancelado'
                },
                fecha_procedimiento_inicio: {
                    [Op.and]: [{ [Op.gte]: firstDate },{ [Op.lt]: lastDate }],
                }
            },
            order: [
                ['fecha_procedimiento_inicio', 'ASC']
            ],
            attributes: [
                'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 'fecha_procedimiento_fin', 'estatus', 'id_procedimiento'
            ]
        });

        res.json({
            msg: 'getProceduresMonth',
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
            { model: Medico, attributes: ['id_medico','nombre','apellidos'] },
            { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] }
        ],
        
        where: {
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            },
            id_medico: idMedico
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 'id_procedimiento', 'estatus'
        ]
    });
    
    res.json({
        msg: 'getProceduresCalendarDoctor',
        procedimientos
    });
 }

 export const getAllProceduresCurrentDay = async ( req: Request, res: Response ) => {
  
    let today = new Date();
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
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: correctedDate },{ [Op.lt]: dayPlus }],
            }
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio'
        ],
    });
    
    res.json({
        msg: 'getAllProceduresCurrentDay',
        procedimientos
    });
 }

 
export const getAccountingProcedure = async (req: Request, res: Response) => {
    const { id } = req.params; 
    try {

        const procedimiento = await Procedimientos.findByPk(id, {
            attributes: [ 'fecha_procedimiento_inicio', 'fecha_procedimiento_fin', 'estatus', 'detalles', 'costo' ],
            include: [
                { model: Paciente, attributes: ['id_paciente','nombre','apellidos'] },
                { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
                { model: Medico, attributes: ['id_medico','nombre','apellidos']},
                { model: Catalogo_Procedimientos, attributes: ['id_procedimiento','nombre_procedimiento'] },
                { model: Catalogo_Banco, attributes: ['id_banco','nombre_banco'] },
                { model: Catalogo_Forma_Pago, attributes: ['id_forma_pago', 'nombre_forma_pago'] }
            ],
            raw: true 
        });


        res.json({
            msg: 'getAccountingProcedure',
            procedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getAccountingProcedures = async (req: Request, res: Response ) => {

    const { selectedDate } = req.params; 
    console.log(selectedDate)
    let date = new Date().toUTCString();

    if(selectedDate != 'null'){
        date = new Date(selectedDate).toUTCString();
    }

    console.log(date)


    const day = new Date(date).getUTCDate() + 1;
    const newDate = new Date(new Date(date).getUTCFullYear(),new Date(date).getUTCMonth(), day - 1 ,0-7)
    const dayPlus = new Date(new Date(date).getUTCFullYear(),new Date(date).getUTCMonth(), day,0-7);

    const procedimientos = await Procedimientos.findAndCountAll({
        include: [
            { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
            { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
            { model: Medico, attributes: ['id_medico','nombre','apellidos']},
            { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] },
            { model: Catalogo_Banco, attributes: ['id_banco', 'nombre_banco'] },
            { model: Catalogo_Forma_Pago, attributes: ['id_forma_pago', 'nombre_forma_pago'] }
        ],
        
        where: {
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: newDate },{ [Op.lt]: dayPlus }],
            }
        },
        order: [
            ['fecha_procedimiento_inicio', 'ASC']
        ],
        attributes: [
            'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 
            'fecha_procedimiento_fin', 'id_procedimiento', 'estatus', 'id_banco', 'id_forma_pago', 'costo'
        ]
    });
    
    res.json({
        msg: 'getAccountingProcedures',
        procedimientos
    });
}

export const postAccountingProcedure = async (req: Request, res: Response ) => {

    const { body } = req;

    console.log('body-------')
    console.log(body)
    try {
 
        const procedimientoNuevo = await Procedimientos.findByPk(body.id_reserva);

        if(!procedimientoNuevo){ 
            return res.status(400).json({
                msg: 'No se encontro un procedimiento con ese numero de reserva'
            });
        }

        // const procedimiento = Procedimientos.build(procedimientoNuevo.dataValues);
        await procedimientoNuevo.update(body);
        
        res.status(200).json({
            msg: 'Guardado con exito',
            procedimientoNuevo,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postProceduresMasive = async (req: Request, res: Response ) => {
    const body = req.body;
    // console.log(body)
    const result = JSON.parse(body);
    console.log(result)


    try {

        //TODO: verificar si existe el paciente

        result.forEach( async (element: any) => {

            let procedimientoExiste =  await Procedimientos.findOne({
                where: {
                    serie: element.serie
                }
            });

            if(procedimientoExiste == null){
                //Find Patient
                let patient: any = await Paciente.findOne({
                    where: {
                        [Op.and]: [ {nombre: element.nombre_paciente.trim()}, {apellidos: element.apellidos_paciente.trim()} ]
                    }
                });
                // If patient not exist we create it
                if(!patient){
                    let patientObject = {
                        nombre: element.nombre_paciente.trim(),
                        apellidos: element.apellidos_paciente.trim(),
                        fecha_nacimiento: '1900-01-01 00:00:00',
                        genero: 'Sin informacion',
                        correo: null,
                        telefono: '0000000000',
                        id_expediente: 0,
                        rol: 'Paciente',
                        fecha_registro: new Date().toUTCString(),
                        estatus: 2,
                        password: 'Admin123'
                    }
                    let newPatient: any = Paciente.build(patientObject);
                    await newPatient.save();

                    const idMedico = element.doctor;
                    const idPaciente = newPatient.id_paciente; 

                    //Create relation between patient en medic
                    const relacionMedicoPaciente = await MedicoPaciente.findOne({ 
                        where: { 
                            [Op.and]: [ { id_medico: idMedico }, { id_paciente: idPaciente } ]
                        }
                    });

                    if(relacionMedicoPaciente == null){
                        let medicoPaciente: any = MedicoPaciente.build({
                            id_medico: idMedico,
                            id_paciente: idPaciente
                        });
                        await medicoPaciente.save();
                    }

                    let procedimiento = Procedimientos.build({
                        serie: element.serie,
                        id_medico: idMedico,
                        id_paciente: idPaciente,
                        id_quirofano: element.quirofano,
                        fecha_procedimiento_inicio: new Date(element.fecha_procedimiento_inicio).toUTCString(),
                        fecha_procedimiento_fin :new Date(new Date(element.fecha_procedimiento_inicio).setMinutes(new Date(element.fecha_procedimiento_inicio).getMinutes() + 5)).toUTCString(),
                        id_procedimiento: element.procedimiento,
                        estatus: 'Procedimiento Cerrado',
                        detalles: element.detalles,
                        costo: element.costo,
                        id_forma_pago: element.forma_pago,
                        id_banco: element.banco
                    });

                    await procedimiento.save();
                    return;
                }

                //Create Procedure
                let procedimiento = Procedimientos.build({
                    serie: element.serie,
                    id_medico: element.doctor,
                    id_paciente: patient.id_paciente,
                    id_quirofano: element.quirofano,
                    fecha_procedimiento_inicio: new Date(element.fecha_procedimiento_inicio).toUTCString(),
                    fecha_procedimiento_fin :new Date(new Date(element.fecha_procedimiento_inicio).setMinutes(new Date(element.fecha_procedimiento_inicio).getMinutes() + 5)).toUTCString(),
                    id_procedimiento: element.procedimiento,
                    estatus: 'Procedimiento Cerrado',
                    detalles: element.detalles,
                    costo: element.costo,
                    id_forma_pago: element.forma_pago,
                    id_banco: element.banco
                });

                await procedimiento.save();
            }
            else{

                 let patient: any = await Paciente.findOne({
                    where: {
                        [Op.and]: [ {nombre: element.nombre_paciente.trim()}, {apellidos: element.apellidos_paciente.trim()} ]
                    }
                });

                //Update procedure
                await procedimientoExiste.update({
                    serie: element.serie,
                    id_medico: element.doctor,
                    id_paciente: patient.id_paciente,
                    id_quirofano: element.quirofano,
                    fecha_procedimiento_inicio: new Date(element.fecha_procedimiento_inicio).toUTCString(),
                    fecha_procedimiento_fin :new Date(new Date(element.fecha_procedimiento_inicio).setMinutes(new Date(element.fecha_procedimiento_inicio).getMinutes() + 5)).toUTCString(),
                    id_procedimiento: element.procedimiento,
                    estatus: 'Procedimiento Cerrado',
                    detalles: element.detalles,
                    costo: element.costo,
                    id_forma_pago: element.forma_pago,
                    id_banco: element.banco
                });
            }
        });

        res.status(200).json({
            msg: 'Guardado con exito',
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getProceduresIncomesByOperatingRoom = async (req: Request, res: Response ) => {

    const { start, end } = req.params; 
    console.log(start)
    console.log(end)
    // let date = new Date().toUTCString();

    // console.log(date)


    // const day = new Date(end).getUTCDate();
    // const newDate = new Date(new Date(date).getUTCFullYear(),new Date(date).getUTCMonth(), day - 1 ,0-7)
    // const newEnd = new Date(new Date(end).getUTCFullYear(),new Date(end).getUTCMonth(), day,new Date(end).getUTCHours(),59,59).toUTCString();

    // console.log(newEnd)
    const totalIncome = await Procedimientos.findAndCountAll({
        attributes: [ "id_quirofano",
                      [Sequelize.fn("sum", Sequelize.col("costo")), "total_income"],
        ],
        include: [{ model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },],
        where: {
            fecha_procedimiento_inicio: {
                [Op.and]: [{ [Op.gte]: start },{ [Op.lt]: end }],
            }
        },
        group: ["id_quirofano"],
    });

    // const procedimientos = await Procedimientos.findAndCountAll({
    //     include: [
    //         { model: Paciente, attributes: ['nombre','apellidos', 'id_paciente'] },
    //         { model: Quirofano, attributes: ['id_quirofano','nombre_quirofano'] },
    //         { model: Medico, attributes: ['id_medico','nombre','apellidos']},
    //         { model: Catalogo_Procedimientos, attributes: ['id_procedimiento', 'nombre_procedimiento'] },
    //         { model: Catalogo_Banco, attributes: ['id_banco', 'nombre_banco'] },
    //         { model: Catalogo_Forma_Pago, attributes: ['id_forma_pago', 'nombre_forma_pago'] }
    //     ],
        
    //     where: {
    //         fecha_procedimiento_inicio: {
    //             [Op.and]: [{ [Op.gte]: start },{ [Op.lt]: end }],
    //         }
    //     },
    //     order: [
    //         ['fecha_procedimiento_inicio', 'ASC']
    //     ],
    //     attributes: [
    //         'serie','id_reserva', 'id_medico', 'id_paciente', 'id_quirofano', 'fecha_procedimiento_inicio', 
    //         'fecha_procedimiento_fin', 'id_procedimiento', 'estatus', 'id_banco', 'id_forma_pago', 'costo'
    //     ]
    // });

    // console.log(procedimientos.rows)
    
    res.json({
        msg: 'getPIByOR',
        totalIncome
    });
}