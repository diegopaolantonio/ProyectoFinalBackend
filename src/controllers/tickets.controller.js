import { ticketService } from "../services/index.js";
import { responder } from "../traits/Responder.js";

export async function getTickets(req, res) {
  try {
    const tickets = await ticketService.getTickets();
    if (tickets && tickets.error) {
      return responder.errorResponse(res, tickets.error, 400);
    } else {
      return responder.successResponse(res, tickets);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function getTicketById(req, res) {
  try {
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);
    if (ticket && ticket.error) {
      return responder.errorResponse(res, ticket.error, 400);
    } else {
      return responder.successResponse(res, ticket);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}
