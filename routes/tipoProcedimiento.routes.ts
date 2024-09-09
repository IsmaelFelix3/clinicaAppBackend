import { Router } from "express";
import { getTipoProcedimiento, postTipoProcedimiento } from "../controllers/tipoProcedimiento.controller";

const router = Router();

router.get('/getProceduresType/', getTipoProcedimiento);
router.post('/postProceduresType/', postTipoProcedimiento);


export default router;
