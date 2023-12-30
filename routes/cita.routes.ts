import { Router } from "express";
import { deleteCita, getCitaById, getCitas, 
         getLastAppoinment, getTakenSlots, postCita, 
         putCita, getAppoinmentsHistory, getCitasAdmin, 
         appoinmentsByMedicAndDate, getAppoinmentsByDate, getAppoinmentsMonth } 
from '../controllers/citas.controller';

const router = Router();

router.get('/appoinmentsByMonth/:id', getAppoinmentsMonth);
router.get('/appoinmentsByDate/:date', getAppoinmentsByDate);
router.get('/appointmentsHistory/:idPaciente', getAppoinmentsHistory);
router.post('/appoinmentsByMedicAndDate/', appoinmentsByMedicAndDate);
router.get('/lastAppoinment/:idPaciente', getLastAppoinment);
router.get('/takenSlots/:date', getTakenSlots);
router.get('/citasAdmin/', getCitasAdmin);
router.get('/:id', getCitas);
router.get('/getAppoinmentById/:id', getCitaById);
router.post('/', postCita);
router.put('/:id', putCita);
router.put('/editDate/:id', putCita);
router.delete('/:id', deleteCita);

export default router;