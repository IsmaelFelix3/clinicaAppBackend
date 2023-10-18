import { Router } from "express";
import { 
    getHorarios, 
    getHorario, 
    postHorario, 
    putHorario, 
    deleteHorario 
} from '../controllers/horarios.controller';

const router = Router();

router.get('/', getHorarios);
router.get('/:id', getHorario);
router.post('/', postHorario);
router.put('/:id', putHorario);
router.delete('/:id', deleteHorario);

export default router;