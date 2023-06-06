import CartService from "./carts.service.js";
import MessageService from "./messages.service.js";
import ProductService from "./products.service.js";
import TicketService from "./ticket.service.js";
import UserService from "./users.service.js";

export const cartService = new CartService();
export const messageService = new MessageService();
export const productService = new ProductService();
export const ticketService = new TicketService();
export const userService = new UserService();
