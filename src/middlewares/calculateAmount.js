import { updateProductInCart } from "../controllers/carts.controller.js";
import { cartService, productService } from "../services/index.js";

export async function calculateAmount(cid) {
  let cart_1;
  let pid = [];
  let amount = 0;
  let updatedCart;
  let productQuantity = [];

  const cart = await cartService.getCartById(cid);

  cart.forEach((element) => {
    cart_1 = element;
  });

  cart_1.products.forEach(async (element, index) => {
    let quantityInCart;
    pid[index] = element.product._id;
    if (element.quantity < element.product.stock) {
      amount += element.product.price * element.quantity;
      quantityInCart = element.product.stock - element.quantity;

      productQuantity[index] = element.product.stock - element.quantity;
      updatedCart = await cartService.updateQuantityProductInCart(
        cid,
        pid[index],
        productQuantity[index]
        );
        
      } else {
        amount += element.product.price * element.product.stock;
        quantityInCart = 0;
        
        updatedCart = await cartService.deleteProductInCart(cid, pid[index]);

    }
    let product = await productService.getProductById(pid[index]);

    let product_1 = [];
    product.forEach(async (e) => {
      product_1[index] = e;
      product_1[index].stock = quantityInCart;

      const updatedProduct = await productService.updateProduct(
        pid[index],
        product_1[index]
      );
      // console.log(updatedProduct);
    });
  });

  return amount;
}
