import { Router } from "express";
import { deleteProcedimiento, getProcedimientos, postProcedimiento, putProcedimiento } from "../controllers/procedimientos.controller";

const router = Router();

router.get('/getProcedures', getProcedimientos);
router.post('/addProcedure', postProcedimiento);
router.put('/editProcedure/:id', putProcedimiento);
router.delete('/deleteProcedure/:id', deleteProcedimiento)

export default router;