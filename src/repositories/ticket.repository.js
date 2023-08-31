import { ticketDao } from "../daos/index.js";

export default class TicketRepository {
  constructor() {
    this.ticketDao = ticketDao;
  }

  getTickets = async () => {
    try {
      const tickets = await this.ticketDao.getTickets();
      return tickets;
    } catch (error) {
      throw new Error(error);
    }
  };

  getTicketById = async (tid) => {
    try {
      const ticket = await this.ticketDao.getTicketById(tid);
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };

  getTicketByPurchaser = async (email) => {
    try {
      const ticket = await this.ticketDao.getTicketByPurchaser(email);
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };

  createTicket = async (order) => {
    try {
      const createdTicket = await this.ticketDao.createTicket(order);
      return createdTicket;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateTicket = async (tid, ticket) => {
    try {
      const updatedTicket = await ticketDao.updateTicket(tid, ticket);
      return updatedTicket;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteTicket = async (tid) => {
    try {
      const deletedTicket = await ticketDao.deleteTicket(tid);
      return deletedTicket;
    } catch (error) {
      throw new Error(error);
    }
  };
}
