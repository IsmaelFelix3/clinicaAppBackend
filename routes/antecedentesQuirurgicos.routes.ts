import { Router } from "express";
import { 
    getAntecedentesQuirurgicos,
    getAntecedenteQuirurgico,
    postAntecedentesQuirurgicos,
    putAntecedentesQuirurgicos,
    deleteAntecedentesQuirurgicos
} from '../controllers/antecedentesQuirurgicos.controller';

const router = Router();

router.get('/', getAntecedentesQuirurgicos);
router.get('/:id', getAntecedenteQuirurgico);
router.post('/', postAntecedentesQuirurgicos);
router.put('/:id', putAntecedentesQuirurgicos);
router.delete('/:id', deleteAntecedentesQuirurgicos);

export default router;