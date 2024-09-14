import { Router } from "express";
import { deleteBrand, getBrand, getBrandById, postBrand, putBrand } from '../controllers/catalogoMarcas.controller';

const router = Router();

router.get('/getBrands/', getBrand);
router.get('/getBrandById/:nombre', getBrandById);
router.post('/postBrand/', postBrand);
router.put('/putBrand/', putBrand);
router.delete('/deleteBrand/:id', deleteBrand);

export default router;