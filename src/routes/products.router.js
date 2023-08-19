import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addProducts,
} from "../controllers/products.controller.js";
import { rolePremium } from "../middlewares/auth.js";
import { uploadProducts } from "../middlewares/multer.js";

const router = Router();

router.get("/", getProducts); // Pedido de todos los productos y con limite
router.post("/", rolePremium, addProduct); // Agregar un nuevo product
router.get("/:pid", getProductById); // Pedido de un product especifico por el pid (product id)
router.put("/:pid", rolePremium, updateProduct); // Actualizar los datos de un product epecifico por el pid (product id)
router.delete("/:pid", rolePremium, deleteProduct); // Eliminar un product especifico por el pid (product id)
router.post("/:pid/products", uploadProducts(), addProducts);

export default router;

