import { Router } from "express";
import { deletePaymentMethod, getPaymentMethodById, getPaymentMethods, postPaymentMethod, editPaymentMethod } from "../controllers/catalogoFormaPago.controller";

const router = Router();

router.get('/getPaymentMethods/', getPaymentMethods);
router.get('/getPaymentMethodById/:id', getPaymentMethodById);
router.post('/postPaymentMethod/', postPaymentMethod);
router.post('/editPaymentMethod/', editPaymentMethod);
router.delete('/deletePaymentMethod/:id', deletePaymentMethod);

export default router;