import { Request, Response } from "express";
import CatalogoTasaImpuesto from "../models/catalogoTasaImpuesto";

export const getTasaImpuestos = async (req: Request, res: Response ) => {
    try {

        const tasaImpuestos = await CatalogoTasaImpuesto.findAndCountAll({
            attributes: [ 'id_tasa_impuesto', 'identificador_fiscal', 'nombre_tasa', 'tipo_tasa', 'tipo_monto', 'monto', 
                          'incluirEnPrecio', 'esRetencion', 'etiquetaFactura', 'estado' ]
        });
    
        res.json( {
            msg: 'Get Tasa Impuestos',
            tasaImpuestos
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getTasaImpuestoById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const tasaImpuesto = await CatalogoTasaImpuesto.findOne({
            attributes: [ 'id_tasa_impuesto', 'identificador_fiscal', 'nombre_tasa', 'tipo_tasa', 'tipo_monto', 'monto', 
                'incluirEnPrecio', 'esRetencion', 'etiquetaFactura', 'estado' ],
            where: {
                id_tasa_impuesto: id
            }
        });
    
        res.json( {
            msg: 'Get Tasa Impuesto',
            tasaImpuesto
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postTasaImpuesto = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const tasaImpuesto = await CatalogoTasaImpuesto.findOne({ 
            where: {
                nombre_tasa: body.nombre
            }
        });
    

        if(tasaImpuesto){
            res.json( {
                msg: 'Tasa de impuesto ya esta dado de alta'
            });
            return;
        }

        const tasaImpuestoNuevo = CatalogoTasaImpuesto.build(body);
        await tasaImpuestoNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            tasaImpuestoNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putTasaImpuesto = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const tasaImpuesto = await CatalogoTasaImpuesto.findOne({ 
            where: {
                id_tasa_impuesto: body.id
            }
        });
    
        console.log(tasaImpuesto)
        if(!tasaImpuesto){
            res.json( {
                msg: 'Tasa de impuesto no existe'
            });
            return;
        }

        await tasaImpuesto.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            tasaImpuesto
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteTasaImpuesto = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const tasaImpuesto = await CatalogoTasaImpuesto.findByPk(id);

    if(!tasaImpuesto){
        return res.status(404).json({
            msg: 'No existe una tasa de impuesto con el id' + id
        });
    }

    await tasaImpuesto.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Tasa de impuesto Desactivada'
    });

}