import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager();
let carts = [];

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;  
  const carts = await cartManager.getCartById(cid);
  res.send({ carts });
});

router.post("/", async (req, res) => {
  const carts = await cartManager.addCart();
  return res.send({ carts });
});

router.post("/:cid/porduct/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  
  const carts = await cartManager.addCarts();
  return res.send({ carts });
});

export default router;