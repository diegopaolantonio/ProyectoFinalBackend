import { ticketService } from "../services/index.js";
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
