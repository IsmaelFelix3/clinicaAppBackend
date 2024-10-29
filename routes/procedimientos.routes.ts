import { Router } from "express";
import { deleteProcedimiento, getCurrentProceduresDoctor, 
    getProcedimiento, 
    getProcedimientos, getProceduresByDay, getProceduresCalendarAdmin, 
    getProceduresCalendarDoctor, getProceduresMonthDoctor, postProcedimiento, 
    putProcedimiento , getAllProceduresCurrentDay,
    getProceduresMonth,
    getProceduresDoctorFC
} from "../controllers/procedimientos.controller";

const router = Router();

router.get('/getProcedures/:selectedDate', getProcedimientos);
router.post('/addProcedure', postProcedimiento);
router.put('/editProcedure/:id', putProcedimiento);
router.delete('/deleteProcedure/:id', deleteProcedimiento);
router.get('/getProceduresByDay/:date&:idQuirofano', getProceduresByDay);
router.get('/getCurrentProceduresDoctor/:idMedico', getCurrentProceduresDoctor);
router.get('/getProceduresCalendarDoctor/:date&:idMedico', getProceduresCalendarDoctor);
router.get('/getProceduresMonthDoctor/:idMedico', getProceduresMonthDoctor);
router.get('/getProceduresCalendarAdmin/:date&:idMedico', getProceduresCalendarAdmin);
router.get('/getProcedure/:id', getProcedimiento);
router.get('/getAllProceduresCurrentDay/', getAllProceduresCurrentDay);
router.get('/getProceduresMonth/', getProceduresMonth);
router.get('/getProceduresDoctorFC/:idMedico', getProceduresDoctorFC);




export default router;
