import { Router } from "express";
import { deleteProcedureDetails, getCatalogoProcedimientos, getProceduresBySpecialtyId, 
         getProcedureConfigurationDetails, postCatalogoProcedimientos, 
         putProcedureConfigurationDetails} from "../controllers/catalogoProcedimientos.controller";

const router = Router();

router.get('/getProceduresCatalog/', getCatalogoProcedimientos);
router.get('/getProceduresBySpecialty/:specialtyId', getProceduresBySpecialtyId);
router.post('/postProceduresCatalog/', postCatalogoProcedimientos);
router.get('/getProcedureConfigurationDetails/:id', getProcedureConfigurationDetails);
router.put('/updateProcedureConfigurationDetails/:id', putProcedureConfigurationDetails);
router.delete('/:id', deleteProcedureDetails);

export default router;