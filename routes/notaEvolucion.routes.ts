import { Router } from "express";
import { 
    getNotasEvolucion,
    getNotaEvolucion,
    postNotaEvolucion,
    putNotaEvolucion,
    deleteNotaEvolucion
} from '../controllers/notasEvolucion.controller';

const router = Router();

router.get('/', getNotasEvolucion );
router.get('/:id', getNotaEvolucion );
router.post('/', postNotaEvolucion );
router.put('/:id', putNotaEvolucion );
router.delete('/:id', deleteNotaEvolucion );

export default router;