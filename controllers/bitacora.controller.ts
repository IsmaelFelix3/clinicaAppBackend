import { Request, Response } from "express";
import Bitacora from "../models/bitacora";
import { DataTypes, Op, QueryTypes } from "sequelize";
import Medico from "../models/medico";

export const getBitacoraRecords = async (req: Request, res: Response ) => {
    try {

        const registros = await Bitacora.findAndCountAll({
            include:[
                { model: Medico, attributes: ['id_medico','nombre','apellidos']}
            ],
            order: [
            ['createdAt', 'DESC']
        ],
        });
    
        res.json( {
            msg: 'Get bitacora records',
            registros
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getRecordById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const registro = await Bitacora.findOne({
            where: {
                id
            }
        });
    
        res.json( {
            msg: 'Get Record',
            registro
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postBitacoraRecord = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const nuevoRegistro = Bitacora.build(body);
        await nuevoRegistro.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            nuevoRegistro
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const editRegistro = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const registro = await Bitacora.findOne({ 
            where: {
                id: body.id
            }
        });
    
        console.log(registro)
        if(!registro){
            res.json( {
                msg: 'Banco no existe'
            });
            return;
        }

        await registro.update(body);

        res.status(200).json({
            msg: 'Registro editado con exito',
            registro
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteRegistro = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const registro = await Bitacora.findByPk(id);

    if(!registro){
        return res.status(404).json({
            msg: 'No existe un banco con el id' + id
        });
    }

    // await banco.update({ estado: false });
    await registro.destroy();
    res.json({
        msg: 'Registro eliminado Eliminado'
    });

}

export const getBuildingLogReportTotal = async( req: Request, res: Response ) => {

    try {
        const { start, end } =  req.params;
        const registros = await Bitacora.sequelize?.query(`SELECT M.nombre, M.apellidos,B.medico, COUNT(B.medico) as count, C.descripcion_consultorio FROM bitacora as B JOIN medicos as M ON M.id_medico = B.medico JOIN consultorios as C ON M.id_consultorio = C.id_consultorio where B.fecha BETWEEN '${start}' AND '${end}' group by medico`, 
            {type: QueryTypes.SELECT}
        );

        res.json( {
            msg: 'Get bitacora Report',
            registros
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getBuildingLogReport = async( req: Request, res: Response ) => {

    try {
        const { start, end } =  req.params;
        const registros = await Bitacora.sequelize?.query(`SELECT M.nombre, M.apellidos,B.medico, COUNT(B.medico) as count, B.fecha FROM bitacora as B JOIN medicos as M ON M.id_medico = B.medico where B.fecha BETWEEN '${start}' AND '${end}' group by medico, fecha`, 
            {type: QueryTypes.SELECT}
        );

        res.json( {
            msg: 'Get bitacora Report',
            registros
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


export const getBitacoraByDay = async (req: Request, res: Response ) => {

    const { start } = req.params

    try {

        const rows = await Bitacora.sequelize?.query(`SELECT  B.id, B.tipo_ingreso, B.nombre_ingreso, B.nombre_acompanante, B.motivo_ingreso, B.medico, B.fecha, B.hora_entrada, B.hora_salida, B.createdAt, B.updatedAt,
            M.id_medico , M.nombre , M.apellidos 
            FROM bitacora AS B 
            LEFT OUTER JOIN medicos AS M ON B.medico = M.id_medico 
            where B.fecha = DATE('${start}')`, 
            {type: QueryTypes.SELECT}
        );
    
        res.json( {
            msg: 'Get bitacora records By Day',
            rows
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}