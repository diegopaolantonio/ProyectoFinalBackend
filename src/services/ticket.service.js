import { productRepository, cartRepository, ticketRepository } from "../repositories/index.js";

export default class TSicketService {
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
      let amount = 0;
      let productStock;
      let quantityInCart;
      const cart = await cartRepository.getCartById(cid);
      cart.forEach( async (element) => {

        element.products.forEach( async (element, index) => {

          const pid = element.product._id;
          const product = await productRepository.getProductById(pid);

          product.forEach((product) => {
            productStock = product.stock;
          })

          if(element.quantity < productStock) {
            amount += element.product.price * element.quantity;  
            quantityInCart = productStock - element.quantity;
          } else {
            amount += element.product.price * productStock;
            quantityInCart = 0
          }

          await cartRepository.modifyProductCart(cid, pid, quantityInCart)
        })

      })
      
      console.log(amount);
      // order.amount = await amount.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
      console.log(order.amount);
      const createdTicket = await this.ticketRepository.createTicket(order);
      if (!createdTicket) {
        return { error: "Ticket not created" };
      }
      return createdTicket;
    } catch (error) {
      throw new Error(error);
    }
  };
}
