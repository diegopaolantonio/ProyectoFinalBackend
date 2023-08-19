import { productDao } from "../daos/index.js";

export default class ProductRepository {
  constructor() {
    this.productDao = productDao;
  }

  //Funcion para obtener todos los datos del db
  getProducts = async (limit, page, query, sort) => {
    try {
      const products = await this.productDao.getProducts(
        limit,
        page,
        query,
        sort
      );
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para obtener un product especifico por el id
  getProductById = async (productId) => {
    try {
      const products = await this.productDao.getProductById(productId);
      if (!products) {
        return null;
      } else {
        return products;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para agregar un product al db
  addProduct = async (product) => {
    if (product.status != false) {
      product.status = true;
    }
    try {
      const createdProduct = await this.productDao.addProduct(product);
      return createdProduct;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para actualizar un product por el id en el db
  updateProduct = async (productId, product) => {
    try {
      const updated = await this.productDao.updateProduct(productId, product);
      return updated;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Funcion para eliminar un product por el id en el db
  deleteProduct = async (productId) => {
    try {
      const eliminado = await this.productDao.deleteProduct(productId);
      return eliminado;
    } catch (error) {
      throw new Error(error);
    }
  };
}
