import { Router } from "express";
import { 
    getEstudiosRealizados,
    getEstudioRealizado,
    postEstudiosRealizados,
    putEstudiosRealizados,
    deleteEstudiosRealizados
} from '../controllers/estudiosRealizados.controller';

const router = Router();

router.get('/', getEstudiosRealizados );
router.get('/:id', getEstudioRealizado );
router.post('/', postEstudiosRealizados );
router.put('/:id', putEstudiosRealizados );
router.delete('/:id', deleteEstudiosRealizados );

export default router;