import { Router } from "express";
import { 
    getInmunizaciones,
    getInmunizacion,
    postInmunizacion,
    putInmunizacion,
    deleteInmunizacion
} from '../controllers/inmunizacion.controller';

const router = Router();

router.get('/', getInmunizaciones );
router.get('/:id', getInmunizacion );
router.post('/', postInmunizacion );
router.put('/:id', putInmunizacion );
router.delete('/:id', deleteInmunizacion );

export default router;