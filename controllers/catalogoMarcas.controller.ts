import { Request, Response } from "express";
import CatalogoMarcas from "../models/catalogoMarca";

export const getBrand = async (req: Request, res: Response ) => {
    try {

        const marcas = await CatalogoMarcas.findAndCountAll({
            attributes: [ 'id_marca', 'nombre_marca' ]
        });
    
        res.json( {
            msg: 'Get Brands',
            marcas
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getBrandById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const marca = await CatalogoMarcas.findOne({
            where: {
                id_marca: id
            }
        });
    
        res.json( {
            msg: 'Get Brand',
            marca
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postBrand = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const marca = await CatalogoMarcas.findOne({ 
            where: {
                nombre_marca: body.nombre
            }
        });
    

        if(marca){
            res.json( {
                msg: 'Marca ya esta dado de alta'
            });
            return;
        }

        const marcaNuevo = CatalogoMarcas.build(body);
        await marcaNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            marcaNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putBrand = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const marca = await CatalogoMarcas.findOne({ 
            where: {
                id_marca: body.id
            }
        });
    
        console.log(marca)
        if(!marca){
            res.json( {
                msg: 'Marca no existe'
            });
            return;
        }

        await marca.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            marca
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteBrand = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const marca = await CatalogoMarcas.findByPk(id);

    if(!marca){
        return res.status(404).json({
            msg: 'No existe una marca con el id' + id
        });
    }

    await marca.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Marca Desactivada'
    });

}