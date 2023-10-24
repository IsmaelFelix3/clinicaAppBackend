import { Router } from "express";
import { deleteCita, getCitaById, getCitas, getLastAppoinment, getTakenSlots, postCita, putCita, getAppoinmentsHistory } from '../controllers/citas.controller';

const router = Router();

router.get('/appointmentsHistory/:idPaciente', getAppoinmentsHistory);
router.get('/lastAppoinment/:idPaciente', getLastAppoinment);
router.get('/takenSlots/:date', getTakenSlots);
router.get('/:id', getCitas);
router.get('/getAppoinmentById/:id', getCitaById);
router.post('/', postCita);
router.put('/:id', putCita);
router.delete('/:id', deleteCita);

export default router;