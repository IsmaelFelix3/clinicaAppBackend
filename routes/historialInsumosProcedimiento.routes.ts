import { Router } from "express";
import { getHistorialInsumosByProcedure, getHistorialInsumosProcedimiento } from '../controllers/historialInsumosProcedimiento.controller';

const router = Router();

// router.get('/', getEdificios );
router.get('/:id', getHistorialInsumosByProcedure );


export default router;