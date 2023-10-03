import { Router } from "express";
import { deleteOtraEnfermedad, getOtrasEnfermedades, getOtraEnfermedad, postOtraEnfermedad,putOtraEnfermedad } from '../controllers/otrasEnfermedades.controller';

const router = Router();

router.get('/', getOtrasEnfermedades );
router.get('/:id', getOtraEnfermedad );
router.post('/', postOtraEnfermedad );
router.put('/:id', putOtraEnfermedad );
router.delete('/:id', deleteOtraEnfermedad );

export default router;