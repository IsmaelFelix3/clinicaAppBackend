import { Router } from "express";
import { deleteCategory, getCategories, getCategoryById, postCategory, putCategory } from '../controllers/catalogoCategorias.controller';

const router = Router();

router.get('/getCategories/', getCategories);
router.get('/getCategoryById/:nombre', getCategoryById);
router.post('/postCategory/', postCategory);
router.put('/putCategory/', putCategory);
router.delete('/deleteCategory/:id', deleteCategory);

export default router;