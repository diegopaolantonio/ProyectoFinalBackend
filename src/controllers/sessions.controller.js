import { responder } from "../traits/Responder.js";
import CustomError from "../errors/customError.js";

export async function postRegister(req, res) {
  try {
    return res.send({ status: "Success", message: "User registered" });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getFailRegister(req, res) {
  try {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERREGISTER_ERROR_MESSAGE,
      cause: ErrorsCause.USERREGISTER_ERROR_CAUSE,
      status: 400,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function postLogin(req, res) {
  try {
    if (!req.user) {
      return CustomError.generateCustomError({
        name: ErrorsName.SESSION_ERROR_NAME,
        message: ErrorsMessage.UTHORIZATION_ERROR_MESSAGE,
        cause: ErrorsCause.UTHORIZATION_ERROR_CAUSE,
        status: 401,
      });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      cart: req.user.cart,
      role: req.user.role,
    };
    return responder.successResponse(res, req.user);
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getFailLogin(req, res) {
  try {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
      cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
      status: 400,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getCurrent(req, res) {
  try {
    if (!req.session.user) {
      return CustomError.generateCustomError({
        name: ErrorsName.SESSION_ERROR_NAME,
        message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
        cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
        status: 400,
      });
    }
    res.send({ status: "User logged", payload: req.session.user });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getGithub(req, res) {}

export async function getGithubCallback(req, res) {
  try {
    req.session.user = req.user;
    res.redirect("/products");
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getLogout(req, res) {
  try {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);
      req.session.regenerate(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}
