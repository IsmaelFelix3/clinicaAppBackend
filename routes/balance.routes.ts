import { Router } from "express";
import { getBalanceItems, postBalance } from "../controllers/balance.controller";


const router = Router();

router.get('/getBalanceItems/', getBalanceItems);
// router.get('/getBankById/:id', getBankById);
router.post('/postBalanceItems/', postBalance);
// router.post('/editBank/', editBank);
// router.delete('/deleteBank/:id', deleteBank);

export default router;