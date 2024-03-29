import { ticketModel } from "./models/ticket.model.js";

export default class TicketDao {
  getTickets = async function () {
    try {
      const tickets = await ticketModel.find();
      return tickets;
    } catch (error) {
      return null;
    }
  };

  getTicketById = async function (tid) {
    try {
      const ticket = await ticketModel.findOne({ _id: tid });
      return ticket;
    } catch (error) {
      return null;
    }
  };

  getTicketByPurchaser = async function (email) {
    try {
      const ticket = await ticketModel.find({ purchaser: email });
      return ticket;
    } catch (error) {
      return null;
    }
  };

  createTicket = async function (order) {
    try {
      const createdTicket = await ticketModel.create(order);
      return createdTicket;
    } catch (error) {
      return null;
    }
  };

  deleteTicket = async function (tid) {
    try {
      const deletedTicket = await ticketModel.deleteOne(tid);
      return deletedTicket;
    } catch (error) {
      return null;
    }
  };

  updateTicket = async function (tid, ticket) {
    try {
      const updatedTicket = await ticketModel.updateOne({ _id: tid }, ticket);
      return updatedTicket;
    } catch (error) {
      return null;
    }
  };

  deleteTicket = async function (tid) {
    try {
      const deletedTicket = await ticketModel.deleteOne({ _id: tid });
      return deletedTicket;
    } catch (error) {
      return null;
    }
  };
}
