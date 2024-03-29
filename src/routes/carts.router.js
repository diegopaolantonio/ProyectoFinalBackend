import { Router } from "express";
import { checkSession, roleCartOwner } from "../middlewares/auth.js";
import {
  getCarts,
  getCartsById,
  createCart,
  addProductInCart,
  deleteCart,
  deleteProductInCart,
  updateProductInCart,
  updateQuantityProductInCart,
  createTicket,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", checkSession, getCarts); // Pedido de el archivo completo de carts
router.post("/", checkSession, createCart); // Crear un nuevo cart
router.get("/:cid", roleCartOwner, getCartsById); // Pedido de un cart especifico por el cid (cart id)
router.put("/:cid", roleCartOwner, updateProductInCart); // Llamado para actualizas un cart con id cid mediante un el cuerpo del llamado
router.delete("/:cid", roleCartOwner, deleteCart); // Llamado para eliminar todos los produscts de un cart con id cid
router.put("/:cid/product/:pid", roleCartOwner, updateQuantityProductInCart); // Llamado para actualizas el quantity de un product de un cart con id cid mediante un el cuerpo del llamado
router.post("/:cid/product/:pid", roleCartOwner, addProductInCart); // Agergar un nuevo producto pid (product id) a un cart cid (cart id)
router.delete("/:cid/product/:pid", roleCartOwner, deleteProductInCart); // Llamado para eliminar un product con id pid de un cart con id cid
router.post("/:cid/purchase", createTicket);

export default router;
