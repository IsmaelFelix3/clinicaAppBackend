import { Request, Response } from "express";
import InformacionFarmaceutica from "../models/InformacionFarmaceutica";

export const getInformacionFarmaceutica = async (req: Request, res: Response ) => {
    try {

        const marcas = await InformacionFarmaceutica.findAndCountAll({
            attributes: [ 'id_informacion_farmaceutica', 'id_insumo', 'nombre_ingrediente_activo', 'denominacion_generica_prod', 'denominacion_distintiva_prod',
                          'datos_fabricante','forma_farmaceutica', 'estado' ]
        });
    
        res.json( {
            msg: 'Get Informacion Farmaceutica',
            marcas
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getInformacionFarmaceuticaById = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const marca = await InformacionFarmaceutica.findOne({
            attributes: [ 'id_informacion_farmaceutica', 'id_insumo', 'nombre_ingrediente_activo', 'denominacion_generica_prod', 'denominacion_distintiva_prod',
                'datos_fabricante','forma_farmaceutica', 'estado' ],
            where: {
                id_informacion_farmaceutica: id
            }
        });
    
        res.json( {
            msg: 'Get Informacion Farmaceutica',
            marca
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const postInformacionFarmaceutica = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        // const marca = await InformacionFarmaceutica.findOne({ 
        //     where: {
        //         nombre_marca: body.nombre
        //     }
        // });
    

        // if(marca){
        //     res.json( {
        //         msg: 'Marca ya esta dado de alta'
        //     });
        //     return;
        // }

        const informacionFarmaceuticaNuevo = InformacionFarmaceutica.build(body);
        await informacionFarmaceuticaNuevo.save();

        res.status(200).json({
            msg: 'Guardado con exito',
            informacionFarmaceuticaNuevo
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const putInformacionFarmaceutica = async (req: Request, res: Response ) => {
    console.log(req.body)
    console.log('entro put')
    const body = req.body;
    try {
        const informacionFarmaceutica = await InformacionFarmaceutica.findOne({ 
            where: {
                id_marca: body.id
            }
        });
    
        console.log(informacionFarmaceutica)
        if(!informacionFarmaceutica){
            res.json( {
                msg: 'Informacion farmaceutica no existe'
            });
            return;
        }

        await informacionFarmaceutica.update(body);

        res.status(200).json({
            msg: 'Editado con exito',
            informacionFarmaceutica
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const deleteInformacionFarmaceutica = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const informacionFarmaceutica = await InformacionFarmaceutica.findByPk(id);

    if(!informacionFarmaceutica){
        return res.status(404).json({
            msg: 'No existe informacion farmaceutica con el id' + id
        });
    }

    await informacionFarmaceutica.update({ estado: false });
    // await laboratorio.destroy();
    res.json({
        msg: 'Informacion Farmaceutica Desactivada'
    });

}