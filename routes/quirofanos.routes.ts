import { Router } from "express";
import { getQuirofanos } from "../controllers/quirofanos.controller";

const router = Router();

router.get('/getOperatingRooms', getQuirofanos);

export default router;