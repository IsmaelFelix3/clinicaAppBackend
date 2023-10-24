import { Router } from "express";
import { deleteCita, getCitaById, getCitas, getLastAppoinment, getTakenSlots, postCita, putCita } from '../controllers/citas.controller';

const router = Router();

router.get('/lastAppoinment/:idPaciente', getLastAppoinment);
router.get('/takenSlots/:date', getTakenSlots);
router.get('/:id', getCitas);
router.get('/:id', getCitaById);
router.post('/', postCita);
router.put('/:id', putCita);
router.delete('/:id', deleteCita);

export default router;