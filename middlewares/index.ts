
import { esAdminRole, tieneRol } from '../middlewares/validar-roles';
import { validarCampos } from '../middlewares/validar-campos';
const validarJWT = require('../middlewares/validar-jwt');

exports = {
    esAdminRole, 
    tieneRol,
    validarCampos,
    ...validarJWT
}