import { Router } from "express";
import {
  getTickets,
  getTicketById,
  updateTicket,
} from "../controllers/tickets.controller.js";
import { checkSession } from "../middlewares/auth.js";

const router = Router();

router.get("/", checkSession, getTickets);
router.get("/:tid", checkSession, getTicketById);
router.put("/:tid", checkSession, updateTicket)

export default router;
