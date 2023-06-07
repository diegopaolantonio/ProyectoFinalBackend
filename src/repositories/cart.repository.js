import { cartDao, productDao } from "../daos/index.js";

export default class CartRepository {
  constructor() {
    this.cartDao = cartDao;
    this.productDao = productDao;
  }
  // Funcion para obtener los datos del db
  getCarts = async () => {
    try {
      const carts = await this.cartDao.getCarts();
      if (!carts) {
        return "Get messages error";
      } else {
        return carts;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener los datos de un cart especifico por el id
  getCartById = async (cartId) => {
    try {
      const carts = await this.cartDao.getCartByIdPopulate(cartId);
      if (!carts) {
        return "Id not found";
      } else {
        return carts;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un cart al db
  addCart = async () => {
    try {
      const created = await this.cartDao.addCart();
      if (!created) {
        return "Add cart error";
      } else {
        return created;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un producto por el id al cart indicado por su id
  updateCart = async (cartId, productId, productQuantity) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    let cartProductsArray = [];
    let indexEncontrado = -1;

    if (!productQuantity) {
      productQuantity = 1;
    }

    try {
      const product = await this.productDao.getProductById(productId);
      if (!product) {
        return "Id product not found";
      } else {
        cartToUpdated = await this.cartDao.getCartById(cartId);
        if (!cartToUpdated) {
          return "Id cart not found";
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
              if (element.toString() === productId) {
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

          const updatedCart = await this.cartDao.updateProductsInCart(
            cartId,
            elementsToUpdated
          );
          if (!updatedCart) {
            return "Add product in cart error";
          } else {
            return updatedCart;
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para modificar los products de un cart especifico
  modifyCart = async (cartId, productsElements) => {
    let cartToModify;

    try {
      cartToModify = await this.cartDao.getCartById(cartId);
      if (!cartToModify) {
        return "Id cart not found";
      } else {
        if (!productsElements) {
          return "No elements to update";
        } else {
          const modifyCart = await this.cartDao.updateProductsInCart(
            cartId,
            productsElements
          );
          if (!modifyCart) {
            return "Modify cart error";
          } else {
            return modifyCart;
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para actualizar el quantity de un product especifico de un cart especifico
  modifyProductCart = async (cartId, productId, quantity) => {
    let cartToModify;
    let elementsToModify = [];
    let cartProductsArray = [];
    let indexEncontrado = -1;

    try {
      cartToModify = await this.cartDao.getCartById(cartId);
      if (!cartToModify) {
        return "Id cart not found";
      } else {
        if (productId) {
          if (quantity < 0) {
            return "No quantity to update";
          } else {
            cartToModify.forEach((element) => {
              elementsToModify = element.products;
              element.products.forEach((element, index) => {
                cartProductsArray[index] = element.product;
              });
            });
            if (cartProductsArray.length === 0) {
              return "Empty cart";
            } else {
              cartProductsArray.forEach((element, index) => {
                if (element.toString() === productId) {
                  indexEncontrado = index;
                }
              });
              if (indexEncontrado === -1) {
                return "Product not found in cart";
              } else {
                elementsToModify[indexEncontrado].quantity = quantity;
                const modifyCart = await this.cartDao.updateProductsInCart(
                  cartId,
                  elementsToModify
                );
                if (!modifyCart) {
                  return "Modify cart error";
                } else {
                  return modifyCart;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para eliminar un product de un cart si el id del product no existe vacia el cart
  deleteCart = async (cartId, productId) => {
    let cartToUpdated;
    let elementsToUpdated = [];
    // let updatedProducts = [];

    try {
      cartToUpdated = await this.cartDao.getCartById(cartId);
      if (!cartToUpdated) {
        return "Id cart not found";
      } else {
        if (!productId) {
          const updatedCart = await this.cartDao.updateProductsInCart(
            cartId,
            []
          );
          return updatedCart;
        } else {
          cartToUpdated.forEach((element, index) => {
            elementsToUpdated = element.products;
          });

          const updatedProducts = elementsToUpdated.filter(
            (element) => element.product != productId
          );

          const updatedCart = await this.cartDao.updateProductsInCart(
            cartId,
            updatedProducts
          );
          if (!updatedCart) {
            return "Delete product in cart error";
          } else {
            return updatedCart;
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}
