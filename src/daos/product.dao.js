import { productModel } from "./models/product.model.js";

export default class ProductDao {
  getProducts = async function (limit, page, query, sort) {
    let products;
    try {
      if (!sort) {
        if (!query) {
          products = await productModel.paginate(
            {},
            { limit: limit, page: page }
          );
        } else {
          if (query === "true" || query === "false") {
            products = await productModel.paginate(
              { status: query },
              { limit: limit, page: page }
            );
          } else {
            products = await productModel.paginate(
              { category: query },
              { limit: limit, page: page }
            );
          }
        }
      } else {
        if (!query) {
          products = await productModel.paginate(
            {},
            { limit: limit, page: page, sort: { price: sort } }
          );
        } else {
          if (query === "true" || query === "false") {
            products = await productModel.paginate(
              { status: query },
              { limit: limit, page: page, sort: { price: sort } }
            );
          } else {
            products = await productModel.paginate(
              { category: query },
              { limit: limit, page: page, sort: { price: sort } }
            );
          }
        }
      }
      return products;
    } catch (error) {
      return null;
    }
  };

  getProductById = async function (productId) {
    try {
      const products = await productModel.find({ _id: productId });
      return products;
    } catch (error) {
      return null;
    }
  };

  addProduct = async function (product) {
    try {
      const createdProduct = await productModel.create(product);
      return createdProduct;
    } catch (error) {
      return null;
    }
  };

  updateProduct = async function (productId, product) {
    try {
      const updated = await productModel.updateOne({ _id: productId }, product);
      return updated;
    } catch (error) {
      return null;
    }
  };

  deleteProduct = async function (productId) {
    try {
      const eliminado = await productModel.deleteOne({ _id: productId });
      return eliminado;
    } catch (error) {
      return null;
    }
  };
}
