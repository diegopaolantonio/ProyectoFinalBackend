import {
  cartService,
  messageService,
  productService,
  ticketService,
} from "../services/index.js";
import profileDto from "../daos/dtos/profile.dto.js";
import { responder } from "../traits/Responder.js";
import { generateProducts } from "../faker.js";

export function getLogin(req, res) {
  try {
    res.render("login");
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export function getRegister(req, res) {
  try {
    res.render("register");
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export function getProfile(req, res) {
  try {
    const user = new profileDto(req.session.user);
    res.render("profile", { user: user });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function getProducts(req, res) {
  try {
    const { limit, page, query, sort } = req.query;
    const { first_name, last_name, email, age, cart, role } = req.session.user;
    const products = await productService.getProducts(limit, page, query, sort);

    let productsArray = [];
    products.docs.forEach((element, index) => {
      const _id = element._id;
      const title = element.title;
      const description = element.description;
      const price = element.price;
      const code = element.code;
      const stock = element.stock;
      const category = element.category;
      const status = element.status;
      const thumbnail = element.thumbnail;

      productsArray[index] = {
        _id,
        title,
        description,
        price,
        code,
        stock,
        category,
        status,
        thumbnail,
        cart,
      };
    });
    const { totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } =
      products;
    const actualPage = products.page;
    let prevLink, nextLink;

    if (hasPrevPage) {
      prevLink = `/products?limit=${limit}&page=${prevPage}`;
      if (query) {
        prevLink += `&query=${query}`;
      }
      if (sort) {
        prevLink += `&sort=${sort}`;
      }
    } else {
      prevLink = null;
    }
    if (hasNextPage) {
      nextLink = `/products?limit=${limit}&page=${nextPage}`;
      if (query) {
        nextLink += `&query=${query}`;
      }
      if (sort) {
        nextLink += `&sort=${sort}`;
      }
    } else {
      nextLink = null;
    }
    const name = `${first_name} ${last_name}`;
    res.render("products", {
      name: name,
      email: email,
      age: age,
      cart: cart,
      role: role,
      productsArray: productsArray,
      totalPages: totalPages,
      prevPage: prevPage,
      nextPage: nextPage,
      actualPage: actualPage,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function getProductById(req, res) {
  try {
    const pid = req.params.pid;
    let product2;
    const product = await productService.getProductById(pid);
    const { first_name, last_name, email, age, cart, role } = req.session.user;

    product.forEach((element) => {
      product2 = element;
    });
    const {
      _id,
      title,
      description,
      price,
      code,
      stock,
      category,
      status,
      thumbnail,
    } = product2;

    const name = `${first_name} ${last_name}`;
    res.render("detail", {
      name: name,
      email: email,
      age: age,
      cart: cart,
      role: role,
      _id: _id,
      title: title,
      description: description,
      price: price,
      code: code,
      stock: stock,
      category: category,
      status: status,
      thumbnail: thumbnail,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function getCartById(req, res) {
  try {
    const cid = req.params.cid;
    let cartId;
    const { name, email, age, role } = req.session.user;

    let cartProducts = [];
    const cart = await cartService.getCartById(cid);
    cart.forEach((element) => {
      const products = element.products;
      cartId = element._id;
      products.forEach((element, index) => {
        const { product, quantity } = element;
        const {
          _id,
          title,
          description,
          price,
          code,
          stock,
          category,
          status,
          thumbnail,
        } = product;
        cartProducts[index] = {
          _id,
          title,
          description,
          price,
          code,
          stock,
          category,
          status,
          thumbnail,
          quantity,
        };
      });
    });
    res.render("cart", {
      name: name,
      email: email,
      age: age,
      role: role,
      cartId: cartId,
      cartProducts: cartProducts,
      cartId: cartId,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function updateCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (req.session.user.cart === cid) {
      return responder.errorResponse(
        res,
        (error.message = "Unauthorized"),
        401
      );
    }

    const carts = await cartService.updateCart(cid, pid);
    if (!carts) {
      return responder.errorResponse(
        res,
        (products.error = "Add product in cart error"),
        400
      );
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await messageService.getMessages();
    let messageArray = [];
    messages.forEach((element, index) => {
      const user = element.user;
      const message = element.message;
      messageArray[index] = { user, message };
    });
    res.render("chat", {
      messagesArray: messageArray,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export async function getTickets(req, res) {
  try {
    let ticketsArray = [];
    const tickets = await ticketService.getTickets();
    const user = new profileDto(req.session.user);
    tickets.forEach((e, index) => {
      const _id = e._id;
      const code = e.code;
      const purchase_datetime = e.purchase_datetime;
      const amount = e.amount;
      const purchaser = e.purchaser;

      ticketsArray[index] = { _id, code, purchase_datetime, amount, purchaser };
    });
    res.render("tickets", { user: user, ticketsArray: ticketsArray });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export function realTimeProducts(req, res) {
  try {
    res.render("realTimeProducts", {});
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export function realTimeChat(req, res) {
  try {
    const user = new profileDto(req.session.user);
    res.render("realTimeChat", {
      user: user.name,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}

export function mockingProducts(req, res){
  try {
    const quantity = 100;
    const products = [];

    for(let i = 0; i < quantity; i++) {
      products[i] = generateProducts(i);
    }

    res.render("mocking", {
      productsArray: products,
    });

  } catch (error) {
    return responder.errorResponse(res, error.message);
  }
}