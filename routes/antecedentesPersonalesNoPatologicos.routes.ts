import { Router } from "express";
import { 
    getAntecedentesPersonalesNoPatologicos,
    getAntecedentePersonalNoPatologico,
    postAntecedentesPersonalesNoPatologicos,
    putAntecedentesPersonalesNoPatologicos,
    deleteAntecedentesPersonalesNoPatologicos
} from '../controllers/antecedentesPersonalesNoPatologicos.controller';

const router = Router();

router.get('/', getAntecedentesPersonalesNoPatologicos);
router.get('/:id', getAntecedentePersonalNoPatologico);
router.post('/', postAntecedentesPersonalesNoPatologicos);
router.put('/:id', putAntecedentesPersonalesNoPatologicos);
router.delete('/:id', deleteAntecedentesPersonalesNoPatologicos);

export default router;