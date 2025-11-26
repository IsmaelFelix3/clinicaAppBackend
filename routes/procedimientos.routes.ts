import { Router } from "express";
import { deleteProcedimiento, getCurrentProceduresDoctor, 
    getProcedimiento, 
    getProcedimientos, getProceduresByDay, getProceduresCalendarAdmin, 
    getProceduresCalendarDoctor, getProceduresMonthDoctor, postProcedimiento, 
    putProcedimiento , getAllProceduresCurrentDay,
    getProceduresMonth,
    getProceduresDoctorFC,
    getAccountingProcedure,
    getAccountingProcedures,
    postAccountingProcedure,
    postProceduresMasive,
    getProceduresIncomesByOperatingRoom,
    getAcumulativeProcedures,
    getTotalIncomesMonthProcedures,
    getTotalIncomeByOperatingRoom,
    getTotalProceduresByOperatingRoom,
    getTotalMonthProceduresByIdReport,
    getTotalProceduresByOperatingRoomByDates
} from "../controllers/procedimientos.controller";

import bodyParser from "body-parser";

const textParser = bodyParser.text({limit: '50mb'})

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
router.get('/getAccountingProcedure/:id', getAccountingProcedure);
router.get('/getAccountingProcedures/:selectedDate', getAccountingProcedures);
router.post('/addAccountingProcedure', postAccountingProcedure);
router.post('/postProceduresMasive', textParser, postProceduresMasive);
router.get('/getPIByOR/:start&:end', getProceduresIncomesByOperatingRoom);
router.get('/getAcumulativeProceduresReport/',getAcumulativeProcedures);
router.get('/getTotalIncomesProceduresMonth/',getTotalIncomesMonthProcedures);
router.get('/getTotalIncomesByOperatingRoom/',getTotalIncomeByOperatingRoom)
router.get('/getTotalProceduresByOperatingRoom/',getTotalProceduresByOperatingRoom)
router.post('/getTotalMonthProceduresByIdReport/',getTotalMonthProceduresByIdReport)
router.get('/getTotalProceduresByOperatingRoomByDates/:start&:end',getTotalProceduresByOperatingRoomByDates)


export default router;
