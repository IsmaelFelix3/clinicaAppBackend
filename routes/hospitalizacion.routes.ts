import { Router } from "express";
import { 
    getHospitalizaciones,
    getHospitalizacion,
    postHospitalizacion,
    putHospitalizacion,
    deleteHospitalizacion
} from '../controllers/hospitalizaciones.controller';

const router = Router();

router.get('/', getHospitalizaciones );
router.get('/:id', getHospitalizacion );
router.post('/', postHospitalizacion );
router.put('/:id', putHospitalizacion );
router.delete('/:id', deleteHospitalizacion );

export default router;