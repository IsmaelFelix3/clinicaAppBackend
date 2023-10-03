import { Router } from "express";
import { 
    getAntecedentesAndrologicos, 
    getAntecedenteAndrologico, 
    postAntecedentesAndrologicos, 
    putAntecedentesAndrologicos, 
    deleteAntecedentesAndrologicos 
} from '../controllers/antecedentesAndrologicos.controller';

const router = Router();

router.get('/', getAntecedentesAndrologicos);
router.get('/:id', getAntecedenteAndrologico);
router.post('/', postAntecedentesAndrologicos);
router.put('/:id', putAntecedentesAndrologicos);
router.delete('/:id', deleteAntecedentesAndrologicos);

export default router;