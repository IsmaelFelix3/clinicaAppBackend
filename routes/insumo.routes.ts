import { Router } from "express";
import { deleteInsumo, getInsumoByCodigo, getInsumos, postInsumo, putInsumo } from "../controllers/insumos.controller";

const router = Router();

router.get('/getInsumos/', getInsumos);
router.get('/getInsumo/:codigo', getInsumoByCodigo);
router.post('/postInsumo/', postInsumo);
router.put('/putInsumo/', putInsumo);
router.delete('/deleteInsumo/:id_insumo', deleteInsumo);




export default router;