import { Router } from "express";
import { getMessages, addMessage } from "../controllers/messages.controller.js";
import { roleUser } from "../middlewares/auth.js";

const router = Router();

router.get("/", getMessages); // Llamado para obtener los messages
router.post("/", roleUser, addMessage); // Llamado para agregar un nuevo message

export default router;
