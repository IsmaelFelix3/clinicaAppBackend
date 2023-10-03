import { Router } from "express";
import { 
    getEdificios,
    getEdificio,
    postEdificio,
    putEdificio,
    deleteEdificio
} from '../controllers/edificios.controller';

const router = Router();

router.get('/', getEdificios );
router.get('/:id', getEdificio );
router.post('/', postEdificio );
router.put('/:id', putEdificio );
router.delete('/:id', deleteEdificio );

export default router;