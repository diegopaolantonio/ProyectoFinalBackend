import { ticketService } from "../services/index.js";
import { responder } from "../traits/Responder.js";

import CustomError from "../errors/costumError.js";
import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";

export async function getTickets(req, res) {
  try {
    const tickets = await ticketService.getTickets();
    if (tickets && tickets.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, tickets.error, 400);
    } else {
      return responder.successResponse(res, tickets);
    }
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.TICKETS_ERROR_NAME,
      message: ErrorsMessage.GETTICKETS_ERROR_MESSAGE,
      cause: ErrorsCause.DATABASE_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function getTicketById(req, res) {
  try {
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);
    if (ticket && ticket.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.TICKETS_ERROR_NAME,
        message: ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, ticket.error, 400);
    } else {
      return responder.successResponse(res, ticket);
    }
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.TICKETS_ERROR_NAME,
      message: ErrorsMessage.GETTICKETSBYID_ERROR_MESSAGE,
      cause: ErrorsCause.GETBYID_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}
