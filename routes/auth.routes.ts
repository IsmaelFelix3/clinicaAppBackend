import { Router } from 'express';
import  { check }  from 'express-validator';

import { login, revalidarToken } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar-campos';
const validarJWT =  require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', [
    // check('correo', 'El correo es obligatorio').trim().isEmail(),
    // check('password', 'La contraseña es obligatoria').not().isEmpty(),
    // validarCampos
], login);

router.get('/renew',validarJWT.validarJWT,revalidarToken);
// router.get('/renew',revalidarToken);


export default router;