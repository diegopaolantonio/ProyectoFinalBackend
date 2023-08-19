import { Router } from "express";
import {
  checkLogged,
  checkSession,
  roleUser,
  rolePremium,
  roleCartOwner,
  roleAdmin,
} from "../middlewares/auth.js";
import {
  getLogin,
  getRegister,
  getProfile,
  getProducts,
  getProductById,
  addProduct,
  getCartById,
  updateCart,
  getMessages,
  getTickets,
  realTimeProducts,
  realTimeChat,
  mockingProducts,
  loggerTest,
  restorePasswordRequest,
  restorePassword,
  getDocuments,
  getUsers,
  getUserById,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/login", checkLogged, getLogin); // Llamado a la vista de login
router.get("/register", checkLogged, getRegister); // Llamado a la vista para un nuevo registro
router.get("/", checkSession, getProfile); // Llamado a la vista para hacer login que remplaza la vista que originalmente tenia con products
router.get("/products", checkSession, getProducts); // Llamado a la vista de products con querys con Handlebars
router.get("/product/Detail/:pid", checkSession, getProductById); // Llamado a la vista de detalles del product
router.get("/addproduct", rolePremium, addProduct);
router.get("/cart/:cid", roleCartOwner, getCartById); // Llamado a la vista de los productos del cart
router.get("/:cid/product/:pid", roleCartOwner, updateCart); // Llamado para agregar el product con id pid en el cart con id cid, con el boton en /products y /products/detail/pid
router.get("/messages", checkSession, getMessages); // llamado a la vista de messages
router.get("/tickets", checkSession, getTickets); // Llamado a la vista de tickets
router.get("/mockingproducts", mockingProducts);
router.get("/realtimeproducts", rolePremium, realTimeProducts); // Llamado a la vista con Socket actualizados en tiempo real de products
router.get("/realtimechat", roleUser, realTimeChat); // Llamado a la vista con Socket actualizados en tiempo real de messages
router.get("/loggerTest", loggerTest);
router.get("/restorePasswordRequest", checkLogged, restorePasswordRequest);
router.get("/restorePassword/:rid", checkLogged, restorePassword);
router.get("/users", roleAdmin, getUsers) //Llamado a la vista de los usuarios para el admin
router.get("/users/:uid", roleAdmin, getUserById) // Llamado a la vista en detalle de un usuario por su email

router.get("/documents", checkSession, getDocuments);

export default router;
