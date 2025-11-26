import { Router } from "express";
import { deleteRegistro, editRegistro, getBitacoraByDay, getBitacoraRecords, getBuildingLogReport, getBuildingLogReportTotal, getRecordById, postBitacoraRecord } from "../controllers/bitacora.controller";

const router = Router();

router.get('/getBitadoraRecords/', getBitacoraRecords);
router.get('/getRecordById/:id', getRecordById);
router.post('/postBitacoraRecord/', postBitacoraRecord);
router.post('/editRecord/', editRegistro);
router.delete('/deleteRecord/:id', deleteRegistro);
router.get('/getBuildingLogReport/:start&:end', getBuildingLogReport);
router.get('/getBuildingLogReportTotal/:start&:end', getBuildingLogReportTotal);
router.get('/getBuildingLogByDay/:start', getBitacoraByDay);


export default router;