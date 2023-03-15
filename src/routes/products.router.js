import { Router } from "express";
import { uploader } from "../utils.js";
import ProductManager from "../ProductManager.js";

const router = Router();
let products = [];
const productManager = new ProductManager();

router.get("/", (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (!limit) {
    res.send({ products });
  } else {
    let productsLimit = [];
    for (let i = 0; i < limit && i < products.length; i++) {
      productsLimit.push(products[i]);
    }
    res.send(productsLimit);
  }
});

router.get("/:pid", (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = productManager.getProductById(pid);
  res.send(product);
});

router.post("/", (req, res) => {
  const product = req.body;
  let products = productManager.getProduct();
  products = productManager.addProduct(product)
  return res.send({ status: "Success" });
});

router.put("/:pid/", (req, res) => {
  const pid = parseInt(req.params.pid);
  const updateProduct = res.body
  let products = productManager.getProduct();
  const productIndex = products.findIndex(
    (productToUpdate) => productToUpdate.id === pid
  );
  producs = productManager.updateProduct(pid, updateProduct)
})

router.delete("/:id", (req, res) => {
  const pid = parseInt(req.params.pid);
  let products = res-body;
  products = productManager.deleteProduct(pid)
})

export default router;
