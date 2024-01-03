import { Router } from "express";
import { getMotivoConsulta } from "../controllers/catalogoMotivoConsulta.controller";

const router = Router();

router.get('/getMotivoConsulta', getMotivoConsulta);

export default router;