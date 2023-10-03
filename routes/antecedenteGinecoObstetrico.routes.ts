import { Router } from "express";
import { 
    getAntecedentesGinecoObstetricos, 
    getAntecedenteGinecoObstetrico, 
    postAntecedentesGinecoObstetricos, 
    putAntecedentesGinecoObstetricos, 
    deleteAntecedentesGinecoObstetricos 
} from '../controllers/antecedentesGinecoObstetricos.controller';

const router = Router();

router.get('/', getAntecedentesGinecoObstetricos);
router.get('/:id', getAntecedenteGinecoObstetrico);
router.post('/', postAntecedentesGinecoObstetricos);
router.put('/:id', putAntecedentesGinecoObstetricos);
router.delete('/:id', deleteAntecedentesGinecoObstetricos);

export default router;