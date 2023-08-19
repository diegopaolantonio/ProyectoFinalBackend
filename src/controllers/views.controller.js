import {
  cartService,
  messageService,
  productService,
  ticketService,
  userService,
  restoreService,
} from "../services/index.js";
import profileDto from "../daos/dtos/profile.dto.js";
import { responder } from "../traits/Responder.js";
import { generateProducts } from "../faker.js";
import CustomError from "../errors/customError.js";
import { logger } from "../utilis/logger.js";

export function getLogin(req, res) {
  try {
    res.render("login");
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export function getRegister(req, res) {
  try {
    res.render("register");
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getProfile(req, res) {
  try {
    let user = new profileDto(req.session.user);
    const { email, role } = user;
    let premium = false;
    if (role != "admin") {
      const { _id, verified_documentation } = await userService.getUserByEmail(
        email
      );
      if (role === "premium") {
        premium = true;
      }
      user._id = _id;
      user.verified_documentation = verified_documentation;
    }
    res.render("profile", {
      user: user,
      premium: premium,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getProducts(req, res) {
  try {
    const { limit, page, query, sort } = req.query;
    const { first_name, last_name, email, age, cart, role } = req.session.user;
    const products = await productService.getProducts(limit, page, query, sort);

    let limit_2 = parseInt(limit);
    if (!limit_2 || typeof limit_2 != "number") {
      limit_2 = 10;
    }

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
      const owner = element.owner;
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
        owner,
        thumbnail,
        cart,
      };
    });
    const { totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } =
      products;
    const actualPage = products.page;
    let prevLink, nextLink;

    if (hasPrevPage) {
      prevLink = `/products?limit=${limit_2}&page=${prevPage}`;
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
      nextLink = `/products?limit=${limit_2}&page=${nextPage}`;
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
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getProductById(req, res) {
  try {
    const pid = req.params.pid;
    // let product2;
    let userNotAdminOrOwner = null;
    let userAdminOrOwner = null;
    const product = await productService.getProductById(pid);
    const { first_name, last_name, email, age, cart, role } = req.session.user;

    // product.forEach((element) => {
    //   product2 = element;
    // });
    const {
      _id,
      title,
      description,
      price,
      code,
      stock,
      category,
      status,
      owner,
      thumbnail,
    // } = product2;
    } = product;
    if(req.session.user.email != owner) {
      userNotAdminOrOwner = true;
    }
    if(req.session.user.role === "admin" || req.session.user.email === owner) {
      userAdminOrOwner = true;
    }

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
      owner: owner,
      thumbnail: thumbnail,
      userNotAdminOrOwner: userNotAdminOrOwner,
      userAdminOrOwner: userAdminOrOwner,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function addProduct(req, res) {
  try {
    res.render("addproduct");
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
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
          owner,
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
          owner,
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
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateCart(req, res) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    if (req.session.user.cart === cid) {
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.UTHORIZATION_ERROR_MESSAGE,
        cause: ErrorsCause.UTHORIZATION_ERROR_CAUSE,
        status: 401,
      });
    }

    const carts = await cartService.updateCart(cid, pid);
    if (!carts) {
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.UPDATECART_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
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
    return responder.errorResponse(res, error.message, error.status);
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
    return responder.errorResponse(res, error.message, error.status);
  }
}

export function realTimeProducts(req, res) {
  try {
    res.render("realTimeProducts", {});
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export function realTimeChat(req, res) {
  try {
    const user = new profileDto(req.session.user);
    res.render("realTimeChat", {
      user: user.name,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export function mockingProducts(req, res) {
  try {
    const quantity = 100;
    const products = [];

    for (let i = 0; i < quantity; i++) {
      products[i] = generateProducts(i);
    }

    res.render("mocking", {
      productsArray: products,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export function loggerTest(req, res, next) {
  try {
    logger.fatal("Fatal log test");
    logger.error("Error log test");
    logger.warning("Warning log test");
    logger.info("Info log test");
    logger.http("HTTP log test");
    logger.debug("Debug log test");

    res.send("Logger test completed");
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function restorePasswordRequest(req, res) {
  try {
    res.render("restoreRequest", {
      restoreExpired: false,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function restorePassword(req, res) {
  try {
    const rid = req.params.rid;

    const restore = await restoreService.getRestoreById(rid);

    if (restore.expirateDate > Date.now()) {
      res.render("restore", {
        rid: rid,
        restore: restore,
        restoreExpired: false,
      });
    } else {
      await restoreService.deleteRestoreByEmail(restore.email);
      res.render("restoreRequest", {
        rid: rid,
        restoreExpired: true,
      });
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export function getDocuments(req, res) {
  try {
    const user = req.user;
    let documentIdentity = null;
    let documentHome = null;
    let documentAccount = null;
    user.documents.forEach(documents => {
      if(documents.reference === "identificacion") {
        documentIdentity = documents.name;
      }
      if(documents.reference === "domicilio") {
        documentHome = documents.name;
      }
      if(documents.reference === "cuenta") {
        documentAccount = documents.name;
      }
    })
    res.render("documents", {
      uid: req.user._id,
      profile: req.user.profile,
      documentIdentity: documentIdentity,
      documentHome: documentHome,
      documentAccount: documentAccount,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getUsers(req, res) {
  try {
    let users = await userService.getUsers();
    let newUsers = [];

    users.forEach((user, index) => {
      const { _id, first_name, last_name, email, role } = user;
      newUsers[index] = { _id, first_name, last_name, email, role };
    });
    res.render("users", {
      usersArray: newUsers,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getUserById(req, res) {
  try {
    const uidRequired = req.params.uid;
    const user = await userService.getUserById(uidRequired);
    let documentIdentity = null;
    let documentHome = null;
    let documentAccount = null;

    const {_id, profile, first_name, last_name, email, age, cart, role, verified_documentation, last_connection} = user;

    user.documents.forEach(documents => {
      if(documents.reference === "identificacion") {
        documentIdentity = documents.name;
      }
      if(documents.reference === "domicilio") {
        documentHome = documents.name;
      }
      if(documents.reference === "cuenta") {
        documentAccount = documents.name;
      }
    })

    res.render("userDetail", {
      _id: _id,
      documentProfile: profile,
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      cart: cart,
      role: role,
      documentIdentity: documentIdentity,
      documentHome: documentHome,
      documentAccount: documentAccount,
      verified_documentation: verified_documentation,
      last_connection: last_connection,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}
