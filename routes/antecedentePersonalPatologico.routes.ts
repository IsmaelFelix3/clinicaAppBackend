import { Router } from "express";
import { 
    getAntecedentesPersonalesPatologicos,
    getAntecedentePersonalPatologico,
    postAntecedentesPersonalesPatologicos,
    putAntecedentesPersonalesPatologicos,
    deleteAntecedentesPersonalesPatologicos
} from '../controllers/antecedentesPersonalesPatologicos.controller';

const router = Router();

router.get('/', getAntecedentesPersonalesPatologicos);
router.get('/:id', getAntecedentePersonalPatologico);
router.post('/', postAntecedentesPersonalesPatologicos);
router.put('/:id', putAntecedentesPersonalesPatologicos);
router.delete('/:id', deleteAntecedentesPersonalesPatologicos);

export default router;