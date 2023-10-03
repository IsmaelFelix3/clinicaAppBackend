import { Router } from "express";
import { 
    getRecetas,
    getReceta,
    postReceta,
    putReceta,
    deleteReceta
} from '../controllers/recetas.controller';

const router = Router();

router.get('/', getRecetas );
router.get('/:id', getReceta );
router.post('/', postReceta );
router.put('/:id', putReceta );
router.delete('/:id', deleteReceta );

export default router;