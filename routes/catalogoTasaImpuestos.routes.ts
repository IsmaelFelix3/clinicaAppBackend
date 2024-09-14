import { Router } from "express";
import { deleteTasaImpuesto, getTasaImpuestoById, getTasaImpuestos, postTasaImpuesto, putTasaImpuesto } from '../controllers/catalogoTasaImpuestos.controller';

const router = Router();

router.get('/getTasaImpuestos/', getTasaImpuestos);
router.get('/getTasaImpuestoById/:nombre', getTasaImpuestoById);
router.post('/postTasaIMpuesto/', postTasaImpuesto);
router.put('/putTasaIMpuesto/', putTasaImpuesto);
router.delete('/deleteTasaIMpuesto/:id', deleteTasaImpuesto);

export default router;