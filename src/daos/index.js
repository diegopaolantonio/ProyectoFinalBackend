import CartDao from "./cart.dao.js";
import MessageDao from "./message.dao.js";
import ProductDao from "./product.dao.js";
import TicketDao from "./ticket.dao.js";
import UserDao from "./user.dao.js";

export const cartDao = new CartDao();
export const messageDao = new MessageDao();
export const productDao = new ProductDao();
export const ticketDao = new TicketDao();
export const userDao = new UserDao();
