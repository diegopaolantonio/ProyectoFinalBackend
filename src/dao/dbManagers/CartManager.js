import { cartModel } from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";

export default class CartManager {
  constructor() {}

  // Funcion para obtener los datos del archivo carrito.jason
  getCarts = async () => {
    try {
      const carts = await cartModel.find();
      if (!carts) {
        return res
          .status(400)
          .send({ status: "error", error: "Get messages error" });
      } else {
        return carts;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para obtener los datos de un cart especifico por el id
  getCartById = async (cartId) => {
    try {
      const carts = await cartModel.find({ _id: cartId });
      if (!carts) {
        return res.status(400).send({ status: "error", error: "Id not found" });
      } else {
        return carts;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un cart al arcihvo
  addCart = async () => {
    try {
      const created = await cartModel.create({ products: [] });
      if (!created) {
        return res
          .status(400)
          .send({ status: "error", error: "Add cart error" });
      } else {
        return created;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para agregar un producto por el id al cart undicado por su id
  updateCart = async (cartId, productId, productQuantity) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    let cartProductsArray = [];
    let indexEncontrado = -1;

    if (!productQuantity) {
      productQuantity = 1;
    }

    try {
      const product = await productModel.find({ _id: productId });
      if (!product) {
        return res
          .status(400)
          .send({ status: "error", error: "Id product not found" });
      } else {
        cartToUpdated = await cartModel.find({ _id: cartId });
        if (!cartToUpdated) {
          return res
            .status(400)
            .send({ status: "error", error: "Id cart not found" });
        } else {
          cartToUpdated.forEach((element, index) => {
            elementsToUpdated = element.products;
            element.products.forEach((element, index) => {
              cartProductsArray[index] = element.product;
            });
          });

          if (cartProductsArray.length === 0) {
            elementsToUpdated = {
              product: productId,
              quantity: productQuantity,
            };
          } else {
            cartProductsArray.forEach((element, index) => {
              if (element === productId) {
                indexEncontrado = index;
              }
            });
            if (indexEncontrado === -1) {
              const newProduct = {
                product: productId,
                quantity: productQuantity,
              };
              elementsToUpdated.push(newProduct);
            } else {
              elementsToUpdated[indexEncontrado].quantity += productQuantity;
            }
          }

          const updatedCart = await cartModel.updateOne(
            { _id: cartId },
            { products: elementsToUpdated }
          );
          if (!updatedCart) {
            return res
              .status(400)
              .send({ status: "error", error: "Add product in cart error" });
          } else {
            return updatedCart;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteCart = async (cartId, productId) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    let updatedProducts = [];

    try {
      cartToUpdated = await cartModel.find({ _id: cartId });
      if (!cartToUpdated) {
        return "Id cart not found";
      } else {
        if (!productId) {
          const updatedCart = await cartModel.updateOne(
            { _id: cartId },
            { products: [] }
          );
          return updatedCart;
        } else {

          cartToUpdated.forEach((element, index) => {
            console.log(element);
            elementsToUpdated = element.products;
          });

          const updatedProducts = elementsToUpdated.filter( (element) => element.product != productId);
          const updatedCart = await cartModel.updateOne(
            { _id: cartId },
            { products: updatedProducts }
          );
          if (!updatedCart) {
            return "Delete product in cart error";
          } else {
            return updatedCart;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
