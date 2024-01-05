import { Router } from "express";
import { deleteProcedimiento, getCurrentProceduresDoctor, getProcedimientos, getProceduresByDay, getProceduresCalendarDoctor, getProceduresMonthDoctor, postProcedimiento, putProcedimiento } from "../controllers/procedimientos.controller";

const router = Router();

router.get('/getProcedures', getProcedimientos);
router.post('/addProcedure', postProcedimiento);
router.put('/editProcedure/:id', putProcedimiento);
router.delete('/deleteProcedure/:id', deleteProcedimiento);
router.get('/getProceduresByDay/:date&:idQuirofano', getProceduresByDay);
router.get('/getCurrentProceduresDoctor/:idMedico', getCurrentProceduresDoctor);
router.get('/getProceduresCalendarDoctor/:date&:idMedico', getProceduresCalendarDoctor);
router.get('/getProceduresMonthDoctor/:idMedico', getProceduresMonthDoctor);

export default router;
