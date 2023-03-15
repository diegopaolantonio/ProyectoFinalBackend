import fs from "fs";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

export default class CartManager {
  constructor() {
    this.path = "./files/carrito.json";
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const fileData = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(fileData);
      return result;
    } else {
      return [];
    }
  };

  getCartById = async (cartId) => {
    const carts = await this.getcarts();

    const cartIndex = carts.findIndex(
      (cart) => cart.id === cartId
    );

    if (cartIndex === -1) {
      return "Id not found";
    }
    return carts[cartIndex];
  };

// Agrega el producto al archivo
addCart = async (cart) => {
  let carts = await this.getCarts();

  if (carts.length === 0) {
    carts: {
      id = 1,
      products = []
    };
  } else {
    carts: {
      id = carts[carts.length - 1].id + 1,
      products = []
    };
  }
  return carts;
};

// Actualiza producto del id indicado con los campos enviados
updateCart = async (cartId, productId) => {
  const carts = await this.getCarts();

  const products = await productManager.getProducts();
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return "Product not exist"
  } else {

  const cartIndex = carts.products.findIndex(
    (cartToUpdate) => cartToUpdate.id === cartId
  );

  if (cartIndex === -1) {
    carts.products[carts.length + 1] = {
      product: productId,
      quantity: 1
    };

    const string = JSON.stringify(carts, null, "\t");
    await fs.promises.writeFile(this.path, string);

    return carts.products[carts.length];
  } else {
    carts[cartIndex].quantity++;

    const string = JSON.stringify(carts, null, "\t");
    await fs.promises.writeFile(this.path, string);

    return carts[cartIndex];
  }}
};

}


