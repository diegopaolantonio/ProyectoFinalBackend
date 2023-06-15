import { productService } from "../services/index.js";
import { responder } from "../traits/Responder.js";

import CustomError from "../errors/costumError.js";
import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";

export async function getProducts(req, res) {
  try {
    const { limit, page, query, sort } = req.query;
    const products = await productService.getProducts(limit, page, query, sort);

    if (products && products.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.GETPRODUCTS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, products.error, 400);
    } else {
      const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } =
        products;
      const actualPage = products.page;
      let prevLink, nextLink;

      if (hasPrevPage) {
        prevLink = `/api/products?limit=${limit}&page=${prevPage}`;
        if (query) {
          prevLink += `&query=${query}`;
        }
        if (sort) {
          prevLink += `&sort=${sort}`;
        }
      } else {
        prevLink = null;
      }
      if (hasNextPage) {
        nextLink = `/api/products?limit=${limit}&page=${nextPage}`;
        if (query) {
          nextLink += `&query=${query}`;
        }
        if (sort) {
          nextLink += `&sort=${sort}`;
        }
      } else {
        nextLink = null;
      }
      const products2 = {
        docs,
        totalPages,
        prevPage,
        nextPage,
        actualPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      };
      return responder.successResponse(res, products2);
    }
  } catch (error) {
    // return CustomError.generateCustomError({
    //   name: ErrorsName.PRODUCTS_ERROR_NAME,
    //   message: ErrorsMessage.GETPRODUCTS_ERROR_MESSAGE,
    //   cause: ErrorsCause.DATABASE_ERROR_CAUSE,
    // });
    return responder.errorResponse(res, error.message);
  }
}

export async function getProductById(req, res) {
  try {
    const pid = req.params.pid;
    const product = await productService.getProductById(pid);
    if (product && product.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, product.error, 400);
    } else {
      return responder.successResponse(res, product);
    }
  } catch (error) {
    // return CustomError.generateCustomError({
    //   name: ErrorsName.PRODUCTS_ERROR_NAME,
    //   message: ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE,
    //   cause: ErrorsCause.GETBYID_ERROR_CAUSE,
    // });
    return responder.errorResponse(res, error.message);
  }
}

export async function addProduct(req, res) {
  try {
    const product = req.body;
    const products = await productService.addProduct(product);
    if (products && products.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.ADDPRODUCT_ERROR_MESSAGE,
        cause: ErrorsCause.ADDPRODUCT_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, products);
    }
  } catch (error) {
    // return CustomError.generateCustomError({
    //   name: ErrorsName.PRODUCTS_ERROR_NAME,
    //   message: ErrorsMessage.ADDPRODUCT_ERROR_MESSAGE,
    //   cause: ErrorsCause.ADDPRODUCT_ERROR_CAUSE,
    // });
    return responder.errorResponse(res, error.message);
  }
}

export async function updateProduct(req, res) {
  try {
    const pid = req.params.pid;
    const updateProduct = req.body;
    const products = await productService.updateProduct(pid, updateProduct);
    if (products && products.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE,
        cause: ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, products);
    }
  } catch (error) {
    // return CustomError.generateCustomError({
    //   name: ErrorsName.PRODUCTS_ERROR_NAME,
    //   message: ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE,
    //   cause: ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE,
    // });
    return responder.errorResponse(res, error.message);
  }
}

export async function deleteProduct(req, res) {
  try {
    const pid = req.params.pid;
    const products = await productService.deleteProduct(pid);
    if (products && products.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.DELETE_ERROR_MESSAGE,
        cause: ErrorsCause.DELETE_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, products);
    }
  } catch (error) {
    // return CustomError.generateCustomError({
    //   name: ErrorsName.PRODUCTS_ERROR_NAME,
    //   message: ErrorsMessage.DELETE_ERROR_MESSAGE,
    //   cause: ErrorsCause.DELETE_ERROR_CAUSE,
    // });
    return responder.errorResponse(res, error.message);
  }
}
