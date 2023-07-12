import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { roleAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getProducts); // Pedido de todos los productos y con limite
router.post("/", roleAdmin, addProduct); // Agregar un nuevo product
router.get("/:pid", getProductById); // Pedido de un product especifico por el pid (product id)
router.put("/:pid", roleAdmin, updateProduct); // Actualizar los datos de un product epecifico por el pid (product id)
router.delete("/:pid", roleAdmin, deleteProduct); // Eliminar un product especifico por el pid (product id)

export default router;
