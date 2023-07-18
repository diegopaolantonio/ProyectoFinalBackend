import {
  cartService,
  productService,
  ticketService,
} from "../services/index.js";
import config from "../config.js";
import { responder } from "../traits/Responder.js";
import ticketDto from "../daos/dtos/ticket.dto.js";
import transport from "../middlewares/nodemailer.js";
import { logger } from "../utilis/logger.js";

import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";
import CustomError from "../errors/customError.js";

export async function getCarts(req, res) {
  try {
    const carts = await cartService.getCarts();
    if (carts && carts.error) {
      logger.fatal(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.GETCARTS_ERROR_MESSAGE} - ${ErrorsCause.DATABASE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.GETCARTS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get Carts success`);
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function createCart(req, res) {
  try {
    const carts = await cartService.createCart();
    if (carts && carts.error) {
      logger.fatal(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.GETCARTS_ERROR_MESSAGE} - ${ErrorsCause.DATABASE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.GETCARTS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info("Create Cart success");
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getCartsById(req, res) {
  try {
    const cid = req.params.cid;
    const carts = await cartService.getCartById(cid);
    if (carts && carts.error) {
      logger.error(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.GETCARTSBYID_ERROR_MESSAGE} - ${ErrorsCause.DATABASGETBYID_ERROR_CAUSEE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.GETCARTSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get Cart ${cid} success`);
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    if (req.session.user.cart === cid) {
      const productsElements = req.body;

      const carts = await cartService.updateProductInCart(
        cid,
        productsElements
      );
      if (carts && carts.error) {
        logger.warning(
          `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.UPDATECART_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
        );
        return CustomError.generateCustomError({
          name: ErrorsName.CARTS_ERROR_NAME,
          message: ErrorsMessage.UPDATECART_ERROR_MESSAGE,
          cause: ErrorsCause.GETBYID_ERROR_CAUSE,
          status: 400,
        });
      } else {
        logger.info(`Update products in cart ${cid} success`);
        return responder.successResponse(res, carts);
      }
    } else {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.UTHORIZATION_ERROR_MESSAGE} - ${ErrorsCause.UTHORIZATION_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.UTHORIZATION_ERROR_MESSAGE,
        cause: ErrorsCause.UTHORIZATION_ERROR_CAUSE,
        status: 404,
      });
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function deleteCart(req, res) {
  try {
    const cid = req.params.cid;

    const carts = await cartService.deleteCart(cid);
    if (carts && carts.error) {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.UPDATECART_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.UPDATECART_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Delet products in cart ${cid} success`);
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateQuantityProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (req.session.user.cart === cid) {
      const { quantity } = req.body;

      const carts = await cartService.updateQuantityProductInCart(
        cid,
        pid,
        quantity
      );
      if (carts && carts.error) {
        logger.fatal(
          `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.UPDATECART_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
        );
        return CustomError.generateCustomError({
          name: ErrorsName.CARTS_ERROR_NAME,
          message: ErrorsMessage.UPDATECART_ERROR_MESSAGE,
          cause: ErrorsCause.GETBYID_ERROR_CAUSE,
          status: 400,
        });
      } else {
        logger.info(
          `Update quantity ${quantity} product ${pid} in cart ${cid} success`
        );
        return responder.successResponse(res, carts);
      }
    } else {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.UTHORIZATION_ERROR_MESSAGE} - ${ErrorsCause.UTHORIZATION_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.UTHORIZATION_ERROR_MESSAGE,
        cause: ErrorsCause.UTHORIZATION_ERROR_CAUSE,
        status: 404,
      });
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function addProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const { quantity } = req.body;

    const carts = await cartService.addProductInCart(cid, pid, quantity);
    if (carts && carts.error) {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.ADDPRODUCTINCARTS_ERROR_MESSAGE} - ${ErrorsCause.ADDPRODUCTINCARTS_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.ADDPRODUCTINCARTS_ERROR_MESSAGE,
        cause: ErrorsCause.ADDPRODUCTINCARTS_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Add product ${pid} in cart ${cid} success`);
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function deleteProductInCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const carts = await cartService.deleteProductInCart(cid, pid);
    if (carts && carts.error) {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.UPDATECART_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.UPDATECART_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Delete product ${pid} in cart ${cid} success`);
      return responder.successResponse(res, carts);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function createTicket(req, res) {
  try {
    const email = req.session.user.email;
    const cid = req.session.user.cart;

    let cart_1;
    let pid;
    let amount = 0;
    let productsAdded = [];
    let productsNotAdded = [];
    let productsAddedQuantity = [];
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
        productsAddedQuantity.push(quantityInCart);

        let productStock;
        productStock = { stock: quantityInCart };
        await productService.updateProduct(pid, productStock);
      } else {
        productsNotAdded.push(pid);
        productsNotAddedQuantity.push(element.quantity);
      }
    });

    var datetime = new Date();
    var purchase_datetime = datetime.toLocaleString();

    const order = new ticketDto(amount, email, purchase_datetime);
    const createdTicket = await ticketService.createTicket(order);

    await cartService.deleteCart(cid);

    if (productsNotAdded.length) {
      let addProductsCart = [];
      productsNotAdded.forEach(async (e, i) => {
        addProductsCart.push({
          product: productsNotAdded[i],
          quantity: productsNotAddedQuantity[i],
        });
      });
      await cartService.updateProductInCart(cid, addProductsCart);
    }

    let result = {
      createdTicket,
      productsAdded,
      productsNotAdded,
    };
    if (!productsAdded.length) {
      result.error =
        "Ticker no generado, ningun producto seleccionado tiene Stock";
    } else {
      await transport.sendMail({
        from: config.nodemailerUser,
        to: email,
        subject: `Compra finalizada ${result.createdTicket.code}`,
        html: `
        <div>
        <h1>Datos de la compra:</h1>
        <p>Codigo: ${result.createdTicket.code}</p>
        <p>Fecha: ${result.createdTicket.purchase_datetime}</p>
        <p>Monto: ${result.createdTicket.amount}</p>
        <p>Comprador: ${result.createdTicket.purchaser}</p>
        <br />
        <h2>Ids de los productos comprados:</h2>
        <p>${result.productsAdded}</p>
        </h2>
        <h2>Ids de los productos que no pudieron procesarse por falta de stock:</h2>
        <p>${result.productsNotAdded}</p>
        <br />
        <br />
        <h3>Muchas gracias por elegirnos, que disfrute sus productos, lo esperamos nuevamente pronto, saludos cordiales.</h3>
        </div>
        `,
      });
    }

    if (result && result.error) {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.TICKET_ERROR_MESSAGE} - ${ErrorsCause.TICKET_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.TICKET_ERROR_MESSAGE,
        cause: ErrorsCause.TICKET_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Create ticket ${result.createdTicket.code} success`);
      return responder.successResponse(res, result);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

