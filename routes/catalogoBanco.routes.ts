import { Router } from "express";
import { deleteBank, getBankById, getBanks, postBank, editBank } from "../controllers/catalogoBancos.controller";


const router = Router();

router.get('/getBanks/', getBanks);
router.get('/getBankById/:id', getBankById);
router.post('/postBank/', postBank);
router.post('/editBank/', editBank);
router.delete('/deleteBank/:id', deleteBank);

export default router;