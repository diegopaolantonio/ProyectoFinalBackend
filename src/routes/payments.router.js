import { Router } from "express";
import { getPayment, postCharge } from "../controllers/payments.controller.js";
import { checkSession } from "../middlewares/auth.js";

const router = Router();

router.post("/charge/:tid", checkSession, postCharge);
router.get("/payment/:tid", checkSession, getPayment);
export default router;
