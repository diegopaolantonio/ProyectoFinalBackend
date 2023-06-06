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
      console.log(tid);
      const ticket = await ticketModel.findOne({ _id: tid });
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
}
