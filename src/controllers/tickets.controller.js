import { productService, ticketService } from "../services/index.js";
import { responder } from "../traits/Responder.js";
import { logger } from "../utilis/logger.js";

import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";
import CustomError from "../errors/customError.js";

export async function getTickets(req, res) {
  try {
    const tickets = await ticketService.getTickets();
    if (tickets && tickets.error) {
      logger.fatal(
        `${ErrorsName.TICKETS_ERROR_NAME} - ${ErrorsMessage.GETTICKETS_ERROR_MESSAGE} - ${ErrorsCause.DATABASE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get tickets success`);
      return responder.successResponse(res, tickets);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getTicketById(req, res) {
  try {
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);
    if (ticket && ticket.error) {
      logger.warning(
        `${ErrorsName.TICKETS_ERROR_NAME} - ${ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get ticket ${tid} success`);
      return responder.successResponse(res, ticket);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getTicketByPurchaser(req, res) {
  try {
    if (req.session.role === "admin") {
      const tickets = await ticketService.getTickets();
    } else {
      const tickets = await ticketService.getTicketByPurchaser(
        req.session.email
      );
    }
    if (tickets && tickets.error) {
      logger.fatal(
        `${ErrorsName.TICKETS_ERROR_NAME} - ${ErrorsMessage.GETTICKETS_ERROR_MESSAGE} - ${ErrorsCause.DATABASE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get tickets success`);
      return responder.successResponse(res, tickets);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateTicket(req, res) {
  try {
    const tid = req.params.tid;
    const ticket = req.body.ticket;
    const uploadedTicket = await ticketService.updateTicket(tid, ticket);
    if (uploadedTicket && uploadedTicket.error) {
      logger.warning(
        `${ErrorsName.TICKETS_ERROR_NAME} - ${ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get ticket ${tid} success`);
      return responder.successResponse(res, uploadedTicket);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function deleteTicket(req, res) {
  try {
    const tid = req.params.tid;

    const ticket = await ticketService.getTicketById(tid);
    console.log(ticket);
    ticket.soldProducts.forEach(async (element) => {
      console.log(element);
      const { product, quantity } = element;
      const updateProduct = await productService.getProductById(product);
      console.log(updateProduct);
      updateProduct.stock += quantity;
      console.log(updateProduct);
      const updatedProduct = await productService.updateProduct(
        product,
        updateProduct
      );
    });

    const deletedTicket = await ticketService.deleteTicket(tid);
    if (deletedTicket && deletedTicket.error) {
      logger.warning(
        `${ErrorsName.TICKETS_ERROR_NAME} - ${ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Delete ticket ${tid} success`);
      return responder.successResponse(res, deletedTicket);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}
