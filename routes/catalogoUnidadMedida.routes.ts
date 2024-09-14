import { Router } from "express";
import {  } from '../controllers/catalogoTasaImpuestos.controller';
import { getUnidadMedidas, getUnidadMedidaById, postUnidadMedida, putUnidadMedida, deleteUnidadMedida } from "../controllers/catalogoUnidadMedida.controller";

const router = Router();

router.get('/getUnidadMedidas/', getUnidadMedidas);
router.get('/getUnidadMedidaById/:nombre', getUnidadMedidaById);
router.post('/postUnidadMedida/', postUnidadMedida);
router.put('/putUnidadMedida/', putUnidadMedida);
router.delete('/deleteUnidadMedida/:id', deleteUnidadMedida);

export default router;