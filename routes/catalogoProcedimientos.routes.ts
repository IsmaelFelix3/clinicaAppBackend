import { Router } from "express";
import { getCatalogoProcedimientos, getCatalogoProcedimientosByOperatingRoom, postCatalogoProcedimientos } from "../controllers/catalogoProcedimientos.controller";

const router = Router();

router.get('/getProceduresCatalog/', getCatalogoProcedimientos);
router.get('/getProceduresCatalogByOperatingRoom/:operatingRoomId', getCatalogoProcedimientosByOperatingRoom);
router.post('/postProceduresCatalog/', postCatalogoProcedimientos);

export default router;