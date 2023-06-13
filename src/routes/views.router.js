import { Router } from "express";
import {
  checkLogged,
  checkSession,
  roleUser,
  roleAdmin,
  roleCartOwner,
} from "../middlewares/auth.js";
import {
  getLogin,
  getRegister,
  getProfile,
  getProducts,
  getProductById,
  getCartById,
  updateCart,
  getMessages,
  getTickets,
  realTimeProducts,
  realTimeChat,
  mockingProducts,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/login", checkLogged, getLogin); // Llamado a la vista de login
router.get("/register", checkLogged, getRegister); // Llamado a la vista para un nuevo registro
router.get("/", checkSession, getProfile); // Llamado a la vista para hacer login que remplaza la vista que originalmente tenia con products
router.get("/products", checkSession, getProducts); // Llamado a la vista de products con querys con Handlebars
router.get("/product/Detail/:pid", checkSession, getProductById); // Llamado a la vista de detalles del product
router.get("/cart/:cid", roleCartOwner, getCartById); // Llamado a la vista de los productos del cart
router.get("/:cid/product/:pid", roleCartOwner, updateCart); // Llamado para agregar el product con id pid en el cart con id cid, con el boton en /products y /products/detail/pid
router.get("/messages", checkSession, getMessages); // llamado a la vista de messages
router.get("/tickets", checkSession, getTickets); // Llamado a la vista de tickets
router.get("/mockingproducts", mockingProducts);
router.get("/realtimeproducts", roleAdmin, realTimeProducts); // Llamado a la vista con Socket actualizados en tiempo real de products
router.get("/realtimechat", roleUser, realTimeChat); // Llamado a la vista con Socket actualizados en tiempo real de messages

export default router;
