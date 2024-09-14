import { Router } from "express";
import { deleteInsumo, getInsumoByCodigo, getInsumos, postInsumo, postItemsMasive, putInsumo } from "../controllers/insumos.controller";
import bodyParser from "body-parser";

const textParser = bodyParser.text({limit: '50mb'})
const router = Router();

router.get('/getInsumos/', getInsumos);
router.get('/getInsumo/:codigo', getInsumoByCodigo);
router.post('/postInsumo/', postInsumo);
router.post('/postItemsMasive/', textParser, postItemsMasive);
router.put('/putInsumo/', putInsumo);
router.delete('/deleteInsumo/:id_insumo', deleteInsumo);

export default router;