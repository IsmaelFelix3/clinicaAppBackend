import { Router } from "express";
import { getLaboratorios, getLaboratorioById, postLaboratorio, putLaboratorio, deleteLaboratorio } from '../controllers/catalogoLaboratorio.controller';

const router = Router();

router.get('/getLabs/', getLaboratorios);
router.get('/getLabsById/:nombre', getLaboratorioById);
router.post('/postLab/', postLaboratorio);
router.put('/putLab/', putLaboratorio);
router.delete('/deleteLab/:id', deleteLaboratorio);

export default router;