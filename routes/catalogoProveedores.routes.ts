import { Router } from "express";
import { deleteProveedor, getProveedorById, getProveedores, postProveedor, putProveedor } from '../controllers/catalogoProveedores.controller';

const router = Router();

router.get('/getProveedores/', getProveedores);
router.get('/getProveedorById/:nombre', getProveedorById);
router.post('/postProveedor/', postProveedor);
router.put('/putProveedor/', putProveedor);
router.delete('/deleteProveedor/:id', deleteProveedor);

export default router;