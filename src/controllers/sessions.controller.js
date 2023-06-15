import { responder } from "../traits/Responder.js";

export async function postRegister(req, res) {
  try {
    return res.send({ status: "Success", message: "User registered" });
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERREGISTER_ERROR_MESSAGE,
      cause: ErrorsCause.USERREGISTER_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function getFailRegister(req, res) {
  try {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERREGISTER_ERROR_MESSAGE,
      cause: ErrorsCause.USERREGISTER_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, (products.error = "Register error"), 400);
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERREGISTER_ERROR_MESSAGE,
      cause: ErrorsCause.USERREGISTER_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function postLogin(req, res) {
  try {
    if (!req.user) {
      return CustomError.generateCustomError({
        name: ErrorsName.SESSION_ERROR_NAME,
        message: ErrorsMessage.UTHORIZATION_ERROR_MESSAGE,
        cause: ErrorsCause.UTHORIZATION_ERROR_CAUSE,
      });
      // return responder.errorResponse( res, (products.error = "Unauthorized"), 401 );
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
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
      cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function getFailLogin(req, res) {
  try {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
      cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, (products.error = "Failed login"), 400);
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
      cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function getCurrent(req, res) {
  try {
    if (!req.session.user) {
      return CustomError.generateCustomError({
        name: ErrorsName.SESSION_ERROR_NAME,
        message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
        cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
      });
      // res.send({ status: "No user logged" });
    }
    res.send({ status: "User logged", payload: req.session.user });
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERLOGIN_ERROR_MESSAGE,
      cause: ErrorsCause.USERLOGIN_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function getGithub(req, res) {}

export async function getGithubCallback(req, res) {
  try {
    req.session.user = req.user;
    res.redirect("/products");
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.GITHUB_ERROR_MESSAGE,
      cause: ErrorsCause.GITHUB_ERROR_CAUSE,
    });
    return responder.errorResponse(res, error.message);
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
    return CustomError.generateCustomError({
      name: ErrorsName.SESSION_ERROR_NAME,
      message: ErrorsMessage.USERLOGOUT_ERROR_MESSAGE,
      cause: ErrorsCause.USERLOGOUT_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}
