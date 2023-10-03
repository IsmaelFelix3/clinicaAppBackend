import { Router } from "express";
import { 
    getAntecedentesHeredoFamiliares, 
    getAntecedenteHeredoFamiliar, 
    postAntecedentesHeredoFamiliares, 
    putAntecedentesHeredoFamiliares, 
    deleteAntecedentesHeredoFamiliares 
} from '../controllers/antecedentesHeredoFamiliares.controller';

const router = Router();

router.get('/', getAntecedentesHeredoFamiliares);
router.get('/:id', getAntecedenteHeredoFamiliar);
router.post('/', postAntecedentesHeredoFamiliares);
router.put('/:id', putAntecedentesHeredoFamiliares);
router.delete('/:id', deleteAntecedentesHeredoFamiliares);

export default router;