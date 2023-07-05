import { Router } from "express";
import {
  getUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateRole,
  restorePasswordRequest,
  restorePassword,
} from "../controllers/users.controller.js";
import { checkLogged, roleAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getUsers);
router.get("/:email", getUserByEmail); //Pedido de un user especifico por el email
router.get("/:uid", getUserById); // Pedido de un user especifico por el uid (user id)
router.post("/", roleAdmin, createUser); // Agregar un nuevo user
router.put("/:pid", roleAdmin, updateUser); // Actualizar los datos de un user epecifico por el uid (user id)
router.delete("/:pid", roleAdmin, deleteUser); // Eliminar un user especifico por el uid (user id)
router.put("/premium/:uid", updateRole);
router.post(
  "/restorePasswordRequest/:email",
  checkLogged,
  restorePasswordRequest
);
router.post("/restorePassword/:email", checkLogged, restorePassword);

export default router;
