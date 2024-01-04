import { Router } from "express";
import { deleteProcedimiento, getCurrentProceduresDoctor, getProcedimientos, getProceduresByDay, postProcedimiento, putProcedimiento } from "../controllers/procedimientos.controller";

const router = Router();

router.get('/getProcedures', getProcedimientos);
router.post('/addProcedure', postProcedimiento);
router.put('/editProcedure/:id', putProcedimiento);
router.delete('/deleteProcedure/:id', deleteProcedimiento);
router.get('/getProceduresByDay/:date&:idQuirofano', getProceduresByDay);
router.get('/getCurrentProceduresDoctor/:idMedico', getCurrentProceduresDoctor);


export default router;
