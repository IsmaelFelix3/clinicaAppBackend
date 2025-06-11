import { Router } from "express";
import { deleteProcedureDetails, getCatalogoProcedimientos, getCatalogoProcedimientosByOperatingRoom, 
         getProcedureConfigurationDetails, postCatalogoProcedimientos, 
         putProcedureConfigurationDetails} from "../controllers/catalogoProcedimientos.controller";

const router = Router();

router.get('/getProceduresCatalog/', getCatalogoProcedimientos);
router.get('/getProceduresCatalogByOperatingRoom/:operatingRoomId', getCatalogoProcedimientosByOperatingRoom);
router.post('/postProceduresCatalog/', postCatalogoProcedimientos);
router.get('/getProcedureConfigurationDetails/:id', getProcedureConfigurationDetails);
router.put('/updateProcedureConfigurationDetails/:id', putProcedureConfigurationDetails);
router.delete('/:id', deleteProcedureDetails);

export default router;