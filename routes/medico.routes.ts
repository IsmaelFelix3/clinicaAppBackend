import { Router } from "express";
import { deleteMedico, getMedico, getMedicoByEmail, getMedicos, postMedico, putMedico } from '../controllers/medicos.controller';

const router = Router();

router.post('/getMedicoByEmail', getMedicoByEmail);
router.get('/', getMedicos);
router.get('/:id', getMedico);
router.post('/', postMedico);
router.put('/:id', putMedico);
router.delete('/:id', deleteMedico);

export default router;