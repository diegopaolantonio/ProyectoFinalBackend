import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager();
let carts = [];

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send({ carts });
});

router.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cartsProd = await cartManager.getCartById(cid);
  res.send({ cartsProd });
});

router.post("/", async (req, res) => {
  const carts = await cartManager.addCart();
  return res.send({ carts });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const carts = await cartManager.updateCart(cid, pid);
  return res.send({ carts });
});

export default router;
