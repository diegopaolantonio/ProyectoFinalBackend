import { Router } from "express";
import {
  getUsers,
  deleteInactiveUser,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateRole,
  restorePasswordRequest,
  restorePassword,
  addDocuments,
  addProfiles,
  updateUserDetail,
} from "../controllers/users.controller.js";
import {
  checkLogged,
  roleAdmin,
  verifyDocuments,
} from "../middlewares/auth.js";
import { uploadDocuments, uploadProfiles } from "../middlewares/multer.js";

const router = Router();

router.get("/", roleAdmin, getUsers);
router.post("/", roleAdmin, createUser); // Agregar un nuevo user
router.delete("/", roleAdmin, deleteInactiveUser); // Elimina de la base de datos todos los usuarios que no se hayan conectado en los ultimos 2 dias.
router.get("/:email", getUserByEmail); //Pedido de un user especifico por el email
router.get("/:uid", getUserById); // Pedido de un user especifico por el uid (user id)
router.put("/:uid", roleAdmin, updateUser); // Actualizar los datos de un user epecifico por el uid (user id)
router.delete("/:uid", roleAdmin, deleteUser); // Eliminar un user especifico por el uid (user id)
router.put("/:uid/detail", roleAdmin, updateUserDetail);
router.post("/:uid/documents", uploadDocuments(), addDocuments);
router.post("/:uid/profiles", uploadProfiles(), addProfiles);
router.put("/premium/:uid", verifyDocuments, updateRole);
router.post("/restorePasswordRequest/:email", checkLogged, restorePasswordRequest);
router.post("/restorePassword/:email", checkLogged, restorePassword);

export default router;
