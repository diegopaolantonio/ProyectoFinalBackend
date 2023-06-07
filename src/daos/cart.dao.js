import { cartModel } from "./models/cart.model.js";

export default class CartDao {
  getCarts = async function () {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      return null;
    }
  };

  getCartById = async function (cartId) {
    try {
      const carts = await cartModel.find({ _id: cartId });
      return carts;
    } catch (error) {
      return null;
    }
  };

  getCartByIdPopulate = async function (cartId) {
    try {
      const carts = await cartModel
        .find({ _id: cartId })
        .populate("products.product");
      return carts;
    } catch (error) {
      return null;
    }
  };

  addCart = async function () {
    try {
      const created = await cartModel.create({ products: [] });
      return created;
    } catch (error) {
      return null;
    }
  };

  updateProductsInCart = async function (cartId, products) {
    try {
      // console.log(products);
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { products: products }
      );
      // console.log(updatedCart);
      return updatedCart;
    } catch (error) {
      return null;
    }
  };
}
