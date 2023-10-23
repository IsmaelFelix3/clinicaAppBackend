import { Router } from "express";
import { deleteCita, getCitaById, getCitas, getTakenSlots, postCita, putCita } from '../controllers/citas.controller';

const router = Router();

router.get('/takenSlots/:date', getTakenSlots)
router.get('/:id', getCitas);
router.get('/:id', getCitaById);
router.post('/', postCita);
router.put('/:id', putCita);
router.delete('/:id', deleteCita);

export default router;