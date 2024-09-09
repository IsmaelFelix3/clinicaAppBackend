
import { Request, Response } from "express";
import Procedimientos from '../models/procedimientos';
import { Op, Sequelize, where } from "sequelize";
import moment from "moment";
import TipoProcedimiento from '../models/tipoProcedimiento';


export const getTipoProcedimiento = async (req: Request, res: Response) => {
    try {
        const tipoProcedimiento = await TipoProcedimiento.findAll({
            attributes: [ 'id_tipo_procedimiento', 'nombre_procedimiento', 'insumos_predefinidos', 'tiempo_procedimiento'],
            raw: true 
        });
        res.json({
            msg: 'getProceduresType',
            tipoProcedimiento
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postTipoProcedimiento = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const tipoProcedimiento = await TipoProcedimiento.findOne({ 
            where: {
                nombre_procedimiento: body.nombre_procedimiento
            }
        });
    

        if(tipoProcedimiento){
            res.json( {
                msg: 'Este procedimiento ya esta dado de alta'
            });
            return;
        }

        const tipoProcedimientoNuevo = TipoProcedimiento.build(body);
        await tipoProcedimientoNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            tipoProcedimientoNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}