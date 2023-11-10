import { NextFunction, Request, Response } from "express";

export const esAdminRole = (req: any, res: Response, next: NextFunction) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede ejecutar esta acción`
        })
    }

    next();

}

export const tieneRol = ( ...roles: string[] ) =>{

    return (req: any, res: Response, next: NextFunction) => {

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: `Esta opcion requiere uno de estos roles ${ roles }`
            })
        }

        next();
    }
}