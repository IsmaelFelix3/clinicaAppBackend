import { Request, Response } from "express";
import CatalogoProveedores from "../models/catalogoProveedores";

export const getProveedores = async (req: Request, res: Response ) => {
    try {

        const proveedores = await CatalogoProveedores.findAndCountAll({
            attributes: [ 'id_proveedor', 'nombre_proveedor', 'rfc', 'telefono', 'telefono_extension', 'movil', 'email', 'puesto', 'comentarios',
                          'fecha_alta', 'tipo_domicilio', 'domicilio_calle', 'domicilio_numero_exterior', 'domicilio_numero_interno', 'domicilio_colonia',
                          'domicilio_localidad', 'domicilio_municipio', 'domicilio_estado', 'codigo_postal', 'domicilio_referencia', 'estado']
        });
    
        res.json( {
            msg: 'Get suppliers',
            proveedores
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getProveedorById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const proveedor = await CatalogoProveedores.findOne({
            attributes: [ 'id_proveedor', 'nombre_proveedor', 'rfc', 'telefono', 'telefono_extension', 'movil', 'email', 'puesto', 'comentarios',
                'fecha_alta', 'tipo_domicilio', 'domicilio_calle', 'domicilio_numero_exterior', 'domicilio_numero_interno', 'domicilio_colonia',
                'domicilio_localidad', 'domicilio_municipio', 'domicilio_estado', 'codigo_postal', 'domicilio_referencia', 'estado'],
            where: {
                id_proveedor: id
            }
        });
    
        res.json( {
            msg: 'Get supplier',
            proveedor
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postProveedor = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const proveedor = await CatalogoProveedores.findOne({ 
            where: {
                nombre_proveedor: body.nombre
            }
        });
    

        if(proveedor){
            res.json( {
                msg: 'proveedor ya esta dado de alta'
            });
            return;
        }

        const proveedorNuevo = CatalogoProveedores.build(body);
        await proveedorNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            proveedorNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putProveedor = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const proveedor = await CatalogoProveedores.findOne({ 
            where: {
                id_proveedor: body.id
            }
        });
    
        console.log(proveedor)
        if(!proveedor){
            res.json( {
                msg: 'Proveedor no existe'
            });
            return;
        }

        await proveedor.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            proveedor
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteProveedor = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const proveedor = await CatalogoProveedores.findByPk(id);

    if(!proveedor){
        return res.status(404).json({
            msg: 'No existe un usuario con el id' + id
        });
    }

    await proveedor.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Proveedor Desactivado'
    });

}