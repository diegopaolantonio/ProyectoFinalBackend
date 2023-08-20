import { Router } from "express";
import { createPaymentIntent } from "../controllers/payments.controller.js";

const router = Router();

router.post("/payment-intents", createPaymentIntent);

export default router;
