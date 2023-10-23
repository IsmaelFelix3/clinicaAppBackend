import { Router } from "express";
import { getPaciente, getPacientes, postPaciente, putPaciente, deletePaciente } from '../controllers/pacientes.controller';

const router = Router();

router.get('/:id', getPacientes);
router.get('/:id', getPaciente);
router.post('/', postPaciente);
router.put('/:id', putPaciente);
router.delete('/:id', deletePaciente);

export default router;