import { Request, Response } from "express";
import CatalogoCategorias from "../models/catalogoCategoria";

export const getCategories = async (req: Request, res: Response ) => {
    try {

        const categorias = await CatalogoCategorias.findAndCountAll({
            attributes: [ 'id_categoria', 'nombre_categoria' ]
        });
    
        res.json( {
            msg: 'Get Categories',
            categorias
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getCategoryById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const categoria = await CatalogoCategorias.findOne({
            where: {
                id_categoria: id
            }
        });
    
        res.json( {
            msg: 'Get Category',
            categoria
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postCategory = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        const category = await CatalogoCategorias.findOne({ 
            where: {
                nombre_categoria: body.nombre
            }
        });
    

        if(category){
            res.json( {
                msg: 'Categoria ya esta dado de alta'
            });
            return;
        }

        const categoryNuevo = CatalogoCategorias.build(body);
        await categoryNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            categoryNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putCategory = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const categoria = await CatalogoCategorias.findOne({ 
            where: {
                id_categoria: body.id
            }
        });
    
        console.log(categoria)
        if(!categoria){
            res.json( {
                msg: 'Categoria no existe'
            });
            return;
        }

        await categoria.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            categoria
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteCategory = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const categoria = await CatalogoCategorias.findByPk(id);

    if(!categoria){
        return res.status(404).json({
            msg: 'No existe una categoria con el id' + id
        });
    }

    await categoria.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Categoria Desactivada'
    });

}