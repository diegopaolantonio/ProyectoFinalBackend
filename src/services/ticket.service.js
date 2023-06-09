import { ticketRepository } from "../repositories/index.js";

export default class TicketService {
  constructor() {
    this.ticketRepository = ticketRepository;
  }

  getTickets = async () => {
    try {
      const tickets = await this.ticketRepository.getTickets();
      if (!tickets) {
        return { error: "Tickets collection not found" };
      } else {
        return tickets;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  getTicketByid = async (tid) => {
    try {
      const ticket = await this.ticketRepository.getTicketById(tid);
      if (!ticket) {
        return { error: "Id not found" };
      } else {
        return ticket;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  createTicket = async (cid, order) => {
    try {
      const createdTicket = await this.ticketRepository.createTicket(order);

      if (!createdTicket) {
        return { error: "Ticket not created" };
      } else {
        return createdTicket;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}
