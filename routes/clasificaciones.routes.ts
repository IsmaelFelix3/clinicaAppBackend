import { Router } from "express";
import { deleteClasifiacion, getClasificaciones, getClasificationById, postClasificacion, putClasifiacion } from '../controllers/catalogoClasificacionInsumos.controller';

const router = Router();

router.get('/getClasificaciones/', getClasificaciones);
router.get('/getClasificacionById/:nombre', getClasificationById);
router.post('/postClasifiacion/', postClasificacion);
router.put('/putClasifiacion/', putClasifiacion);
router.delete('/deleteClasifiacion/:id', deleteClasifiacion);

export default router;