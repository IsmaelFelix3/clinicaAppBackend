import { Request, Response } from "express";
import Balance from "../models/balance";

export const getBalanceItems = async (req: Request, res: Response ) => {
    try {

        const conceptos = await Balance.findAndCountAll({
            attributes: [ 'id','nombre', 'importe' ]
        });


    
        res.json( {
            msg: 'Get balance items',
            conceptos
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


export const postBalance = async (req: Request, res: Response ) => {
    console.log(req.body)
    const body = req.body;
    try {
        // const balanceItems = await Balance.findAll({
        //     attributes: ['id','nombre','importe'],
        //     raw: true
        // });

        // console.log(balanceItems)

        

        await Balance.update(Balance,body);

        // res.status(200).json({
        //     msg: 'Guardado con exito',
        //     bancoNuevo
        // });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

// export const editBank = async (req: Request, res: Response ) => {
//     console.log(req.body)
//     console.log('entro put')
//     const body = req.body;
//     try {
//         const banco = await CatalogoBancos.findOne({ 
//             where: {
//                 id_banco: body.id_banco
//             }
//         });
    
//         console.log(banco)
//         if(!banco){
//             res.json( {
//                 msg: 'Banco no existe'
//             });
//             return;
//         }

//         await banco.update(body);

//         res.status(200).json({
//             msg: 'Banco editado con exito',
//             banco
//         });
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             msg: 'Hable con el administrador'
//         });
//     }
// }

// export const deleteBank = async( req: Request, res: Response ) => {

//     const { id } = req.params;

//     const banco = await CatalogoBancos.findByPk(id);

//     if(!banco){
//         return res.status(404).json({
//             msg: 'No existe un banco con el id' + id
//         });
//     }

//     // await banco.update({ estado: false });
//     await banco.destroy();
//     res.json({
//         msg: 'Banco Eliminado'
//     });

// }