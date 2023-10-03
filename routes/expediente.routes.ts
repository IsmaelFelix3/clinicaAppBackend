import { Router } from "express";
import { 
    getExpedientes,
    getExpediente,
    postExpediente,
    putExpediente,
    deleteExpediente
} from '../controllers/expedientes.controller';

const router = Router();

router.get('/', getExpedientes );
router.get('/:id', getExpediente );
router.post('/', postExpediente );
router.put('/:id', putExpediente );
router.delete('/:id', deleteExpediente );

export default router;