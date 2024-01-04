import { Router } from "express";
import { getHorariosQuirofanos, getQuirofanos } from "../controllers/quirofanos.controller";

const router = Router();

router.get('/getOperatingRooms', getQuirofanos);
router.get('/getSchedulesOperatingRooms/:quirofano', getHorariosQuirofanos);

export default router;