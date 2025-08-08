import { Request, Response } from "express";
import CatalogoFormaPago from "../models/formaPago";

export const getPaymentMethods = async (req: Request, res: Response ) => {
    try {

        const formasPago = await CatalogoFormaPago.findAndCountAll({
            attributes: [ 'id_forma_pago', 'nombre_forma_pago' ]
        });
    
        res.json( {
            msg: 'Get Payment Methods',
            formasPago
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getPaymentMethodById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const formaPago = await CatalogoFormaPago.findOne({
            where: {
                id_forma_pago: id
            }
        });
    
        res.json( {
            msg: 'Get Payment Method',
            formaPago
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postPaymentMethod = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const formaPago = await CatalogoFormaPago.findOne({ 
            where: {
                nombre_forma_pago: body.nombre_forma_pago
            }
        });
    

        if(formaPago){
            res.json( {
                msg: 'Forma Pago ya esta dado de alta'
            });
            return;
        }

        const newPaymentMethod = CatalogoFormaPago.build(body);
        await newPaymentMethod.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            newPaymentMethod
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const editPaymentMethod = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const formaPago = await CatalogoFormaPago.findOne({ 
            where: {
                id_forma_pago: body.id_forma_pago
            }
        });
    
        console.log(formaPago)
        if(!formaPago){
            res.json( {
                msg: 'Forma Pago no existe'
            });
            return;
        }

        await formaPago.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            formaPago
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deletePaymentMethod = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const formaPago = await CatalogoFormaPago.findByPk(id);

    if(!formaPago){
        return res.status(404).json({
            msg: 'No existe una forma de pago con el id' + id
        });
    }

    await formaPago.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Forma pago Desactivada'
    });

}