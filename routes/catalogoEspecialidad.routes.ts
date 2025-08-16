import { Router } from "express";
import { deleteSpecialty, editSpecialty, getSpecialties, getSpecialtyById, postSpecialty } from "../controllers/catalogoEspecialidades.controller";

const router = Router();

router.get('/getSpecialties/', getSpecialties);
router.get('/getSpecialtyById/:id', getSpecialtyById);
router.post('/postSpecialty/', postSpecialty);
router.post('/editSpecialty/', editSpecialty);
router.delete('/deleteSpecialty/:id', deleteSpecialty);

export default router;