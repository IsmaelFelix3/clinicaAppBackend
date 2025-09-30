import { Router } from "express";
import { deleteRegistro, editRegistro, getBitacoraRecords, getRecordById, postBitacoraRecord } from "../controllers/bitacora.controller";

const router = Router();

router.get('/getBitadoraRecords/', getBitacoraRecords);
router.get('/getRecordById/:id', getRecordById);
router.post('/postBitacoraRecord/', postBitacoraRecord);
router.post('/editRecord/', editRegistro);
router.delete('/deleteRecord/:id', deleteRegistro);

export default router;