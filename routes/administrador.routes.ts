import { Router } from "express";
import { getAdminByEmail } from '../controllers/administradores.controller';

const router = Router();

router.post('/getAdminByEmail', getAdminByEmail);

export default router;