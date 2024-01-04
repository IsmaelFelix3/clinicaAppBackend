import { Router } from "express";
import { deleteProcedimiento, getProcedimientos, getProceduresByDay, postProcedimiento, putProcedimiento } from "../controllers/procedimientos.controller";

const router = Router();

router.get('/getProcedures', getProcedimientos);
router.post('/addProcedure', postProcedimiento);
router.put('/editProcedure/:id', putProcedimiento);
router.delete('/deleteProcedure/:id', deleteProcedimiento);
router.get('/getProceduresByDay/:date&:idQuirofano', getProceduresByDay);

export default router;