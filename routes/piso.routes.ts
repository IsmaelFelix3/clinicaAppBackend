import { Router } from "express";
import { 
    getPisos,
    getPiso,
    postPiso,
    putPiso,
    deletePiso
} from '../controllers/pisos.controller';

const router = Router();

router.get('/', getPisos );
router.get('/:id', getPiso );
router.post('/', postPiso );
router.put('/:id', putPiso );
router.delete('/:id', deletePiso );

export default router;