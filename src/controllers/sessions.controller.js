import { responder } from "../traits/Responder.js";
import { logger } from "../utilis/logger.js";
import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";
import CustomError from "../errors/customError.js";
import { userService } from "../services/index.js"

export async function postRegister(req, res) {
  try {
    logger.info(`User register success`);
    return res.send({ status: "Success", message: "User registered", payload: res.req.user });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getFailRegister(req, res) {
  try {
    logger.error(
      `${ErrorsName.SESSION_ERROR_NAME} - ${ErrorsMessage.USERREGISTER_ERROR_MESSAGE} - ${ErrorsCause.USERREGISTER_ERROR_CAUSE}`
    );
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
      logger.error(
        `${ErrorsName.SESSION_ERROR_NAME} - ${ErrorsMessage.UTHORIZATION_ERROR_MESSAGE} - ${ErrorsCause.UTHORIZATION_ERROR_CAUSE}`
      );
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
      verified_documentation: req.user.verified_documentation
    };

    const user = await userService.getUserByEmail(req.session.user.email);
    user.last_connection = Date.now();
    await userService.updateUser(user._id, user);

    logger.info(`User login ${req.session.user.email} success`);
    return responder.successResponse(res, req.user);
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getFailLogin(req, res) {
  try {
    logger.warning(
      `${ErrorsName.SESSION_ERROR_NAME} - ${ErrorsMessage.USERLOGIN_ERROR_MESSAGE} - ${ErrorsCause.USERLOGIN_ERROR_CAUSE}`
    );
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
      logger.warning(
        `${ErrorsName.SESSION_ERROR_NAME} - ${ErrorsMessage.USERLOGIN_ERROR_MESSAGE} - ${ErrorsCause.USERLOGIN_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.SESSION_ERROR_NAME,
        message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
        cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
        status: 400,
      });
    }
    logger.info(`User logged success`);
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
    const user = await userService.getUserByEmail(req.session.user.email);
    user.last_connection = Date.now();
    await userService.updateUser(user._id, user);

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
