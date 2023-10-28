import { Router } from "express";
import { getPaciente, getPacientes, postPaciente, putPaciente, deletePaciente, getAllPacientesAdmin } from '../controllers/pacientes.controller';

const router = Router();

router.get('/allPatientsAdm/', getAllPacientesAdmin);
router.get('/:id', getPacientes);
router.get('/patientById/:id', getPaciente);
router.post('/', postPaciente);
router.put('/:id', putPaciente);
router.delete('/:id', deletePaciente);

export default router;