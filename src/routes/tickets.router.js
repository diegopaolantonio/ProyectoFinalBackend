import { Router } from "express";
import {
  getTickets,
  getTicketById,
} from "../controllers/tickets.controller.js";
import { checkSession } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkSession, getTickets);
router.get("/:tid", checkSession, getTicketById);

export default router;
