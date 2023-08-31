import { productService } from "../services/index.js";
import { responder } from "../traits/Responder.js";
import { logger } from "../utilis/logger.js";
import transport from "../middlewares/nodemailer.js";
import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";
import CustomError from "../errors/customError.js";
import config from "../config.js";

export async function getProducts(req, res) {
  try {
    const { limit, page, query, sort } = req.query;
    const products = await productService.getProducts(limit, page, query, sort);

    if (products && products.error) {
      logger.fatal(
        `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.GETPRODUCTS_ERROR_MESSAGE} - ${ErrorsCause.DATABASE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.GETPRODUCTS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
        status: 400,
      });
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
      logger.info(`Get products success`);
      return responder.successResponse(res, products2);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function addProduct(req, res) {
  try {
    let product = req.body;
    if (req.session.user.role === "premium") {
      product.owner = req.session.user.email;
    } else {
      product.owner = "admin";
    }

    const products = await productService.addProduct(product);
    if (products && products.error) {
      logger.error(
        `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.ADDPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.ADDPRODUCT_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.ADDPRODUCT_ERROR_MESSAGE,
        cause: ErrorsCause.ADDPRODUCT_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info("Add product success");
      return responder.successResponse(res, products);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getProductById(req, res) {
  try {
    const pid = req.params.pid;
    const product = await productService.getProductById(pid);
    if (product && product.error) {
      logger.warning(
        `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get product ${pid} success`);
      return responder.successResponse(res, product);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateProduct(req, res) {
  try {
    const pid = req.params.pid;
    const updateProduct = req.body;
    const products = await productService.updateProduct(pid, updateProduct);
    if (products && products.error) {
      logger.warning(
        `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE,
        cause: ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Update product ${pid} success`);
      return responder.successResponse(res, products);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function deleteProduct(req, res) {
  try {
    const pid = req.params.pid;
    const product = await productService.getProductById(pid);

    if (
      (req.session.user.role === "premium" &&
        req.session.user.email === product.owner) ||
      req.session.user.role === "admin"
    ) {
      const products = await productService.deleteProduct(pid);
      if (products && products.error) {
        logger.warning(
          `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.DELETEPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.DELETE_ERROR_CAUSE}`
        );
        return CustomError.generateCustomError({
          name: ErrorsName.PRODUCTS_ERROR_NAME,
          message: ErrorsMessage.DELETEPRODUCT_ERROR_MESSAGE,
          cause: ErrorsCause.DELETE_ERROR_CAUSE,
          status: 400,
        });
      } else {
        if (product.owner && product.owner != "admin") {
          await transport.sendMail({
            from: config.nodemailerUser,
            to: product.owner,
            subject: `Producto ${product._id} eliminado de la base de datos`,
            html: `
            <div>
            <h1>Lamentamos informar que el producto ${product._id} ah sido eliminado de nuestra base de datos.</h1>
            <h2>Datos del producto eliminado:</h2>
            <p>title: ${product.title}</p>
            <p>description: ${product.description}</p>
            <p>price: ${product.price}</p>
            <p>code: ${product.code}</p>
            <p>stock: ${product.stock}</p>
            <p>category: ${product.category}</p>
            <br />
            <br />
            <h3>Muchas gracias por elegirnos, saludos cordiales.</h3>
            </div>
            `,
          });
        }
        logger.info(`Delete product ${pid} success`);
        return responder.successResponse(res, products);
      }
    } else {
      logger.warning(
        `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.UTHORIZATION_ERROR_MESSAGE} - ${ErrorsCause.UTHORIZATION_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.PRODUCTS_ERROR_NAME,
        message: ErrorsMessage.UTHORIZATION_ERROR_MESSAGE,
        cause: ErrorsCause.UTHORIZATION_ERROR_CAUSE,
        status: 404,
      });
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function addProducts(req, res) {
  const documentation = req.body;
  const files = req.files;

  let product = await productService.getProductById(documentation.pid);
  if (!files.productos) {
    return res.status(400);
  }

  if (!product.thumbnail) {
    product[0].thumbnail[0] = null;
  }

  for (let i = 0; i < files.productos.length; i++) {
    product[0].thumbnail[
      i
    ] = `http://localhost:8080/products/${files.productos[i].filename}`;
  }

  const result = await productService.updateProduct(
    documentation.pid,
    product[0]
  );

  return res.status(200).send({ status: "Success", payload: product[0] });
}
