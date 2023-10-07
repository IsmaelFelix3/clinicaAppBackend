import { Router } from "express";
import { deleteCita, getCita, getCitas, getTakenSlots, postCita, putCita } from '../controllers/citas.controller';

const router = Router();

router.get('/getTakenSlots', getTakenSlots)
router.get('/', getCitas);
router.get('/:id', getCita);
router.post('/', postCita);
router.put('/:id', putCita);
router.delete('/:id', deleteCita);

export default router;