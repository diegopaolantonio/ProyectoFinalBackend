import { updateProductInCart } from "../controllers/carts.controller.js";
import { cartService, productService } from "../services/index.js";

export async function calculateAmount(cid) {
  let cart_1;
  let pid;
  let amount = 0;
  let productsAdded = [];
  let productsNotAdded = [];
  let productsNotAddedQuantity = [];
  const cart = await cartService.getCartById(cid);

  cart.forEach((element) => {
    cart_1 = element;
  });

  cart_1.products.forEach(async (element, index) => {
    let quantityInCart;
    pid = element.product._id;
    if (element.quantity < element.product.stock) {
      amount += element.product.price * element.quantity;
      quantityInCart = element.product.stock - element.quantity;
      productsAdded.push(pid);

      let product = await productService.getProductById(pid);

      let product_1 = [];
      product.forEach(async (e) => {
        product_1[index] = e;
        product_1[index].stock = quantityInCart;

        await productService.updateProduct(pid, product_1[index]);
      });
    } else {
      productsNotAdded.push(pid);
      productsNotAddedQuantity.push(element.quantity);
    }
  });

  const result = {
    amount,
    productsAdded,
    productsNotAdded,
    productsNotAddedQuantity,
  };
  return result;
}
