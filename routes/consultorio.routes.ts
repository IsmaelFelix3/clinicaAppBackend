import { Router } from "express";
import { deleteConsultorio, getConsultingRoomByFloorId, getConsultorio, getConsultorios, postConsultorio, putConsultorio } from "../controllers/consultorios.controller";

const router = Router();

router.get('/getConsultingRoomByFloorId/:id', getConsultingRoomByFloorId );
router.get('/', getConsultorios );
router.get('/:id', getConsultorio );
router.post('/', postConsultorio );
router.put('/:id', putConsultorio );
router.delete('/:id', deleteConsultorio );

export default router;