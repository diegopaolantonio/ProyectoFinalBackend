import {
  productRepository,
  cartRepository,
  ticketRepository,
} from "../repositories/index.js";

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





      // let amount = 0;
      // let quantityInCart;
      // let product;
      // let productStock;

      // const cart = await cartRepository.getCartById(cid);

      // cart.forEach( async (element) => {
        
      //   await element.products.forEach( async (element, index) => {
      //     const pid = element.product._id;
      //     product = await productRepository.getProductById(pid);

      //     product.forEach((element, index) => {
      //       productStock = element.stock;
      //     });

      //     console.log(element.product.price);
          
      //     if (product.quantity < productStock) {
      //       amount += element.product.price * element.quantity;
      //       quantityInCart = productStock - element.quantity;
      //     } else {
      //       amount += element.product.price * productStock;
      //       quantityInCart = 0;
      //     }
          
      //     await cartRepository.modifyProductCart(cid, pid, quantityInCart)

      //   });

      //   order.amount = amount;

      // });



      
      
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
