import { postLogin } from "./sessions.controller.js";
import transport from "../middlewares/nodemailer.js";
import { userService } from "../services/index.js";
import { responder } from "../traits/Responder.js";
import { logger } from "../utilis/logger.js";

import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";
import CustomError from "../errors/customError.js";

export async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    if (users && users.error) {
      //   logger.warning(
      //     `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      //   );
      return CustomError.generateCustomError({
        // name: ErrorsName.PRODUCTS_ERROR_NAME,
        // message: ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE,
        // cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get users success`);
      return responder.successResponse(res, users);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getUserByEmail(req, res) {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmail(email);
    if (user && user.error) {
      //   logger.warning(
      //     `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      //   );
      return CustomError.generateCustomError({
        // name: ErrorsName.PRODUCTS_ERROR_NAME,
        // message: ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE,
        // cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get user ${email} success`);
      return responder.successResponse(res, user);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function getUserById(req, res) {
  try {
    const uid = req.params.uid;
    const user = await userService.getUserById(uid);
    if (user && user.error) {
      //   logger.warning(
      //     `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      //   );
      return CustomError.generateCustomError({
        // name: ErrorsName.PRODUCTS_ERROR_NAME,
        // message: ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE,
        // cause: ErrorsCause.GETBYID_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Get user ${uid} success`);
      return responder.successResponse(res, user);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function createUser(req, res) {
  try {
    let user = req.body;

    const users = await userService.createUser(user);
    if (users && users.error) {
      //   logger.error(
      //     `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.ADDPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.ADDPRODUCT_ERROR_CAUSE}`
      //   );
      return CustomError.generateCustomError({
        // name: ErrorsName.PRODUCTS_ERROR_NAME,
        // message: ErrorsMessage.ADDPRODUCT_ERROR_MESSAGE,
        // cause: ErrorsCause.ADDPRODUCT_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info("Add product success");
      return responder.successResponse(res, users);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateUser(req, res) {
  try {
    const uid = req.params.uid;
    const updateUser = req.body;
    const users = await userService.updateUser(pid, updateUser);
    if (users && users.error) {
      //   logger.warning(
      //     `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE}`
      //   );
      return CustomError.generateCustomError({
        // name: ErrorsName.PRODUCTS_ERROR_NAME,
        // message: ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE,
        // cause: ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Update user ${uid} success`);
      return responder.successResponse(res, users);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function deleteUser(req, res) {
  try {
    const uid = req.params.uid;
    const updateUser = req.body;

    const users = await userService.deleteUser(uid, updateUser);
    if (users && users.error) {
      logger
        .warning
        //   `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.DELETEPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.DELETE_ERROR_CAUSE}`
        ();
      return CustomError.generateCustomError({
        //   name: ErrorsName.PRODUCTS_ERROR_NAME,
        //   message: ErrorsMessage.DELETEPRODUCT_ERROR_MESSAGE,
        //   cause: ErrorsCause.DELETE_ERROR_CAUSE,
        status: 400,
      });
    } else {
      logger.info(`Delete user ${uid} success`);
      return responder.successResponse(res, products);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function updateRole(req, res) {
  try {
    const uid = req.params.uid;
    let role;

    let updateRole = await userService.getUserById(uid);

    updateRole.role === "user" ? (role = "premium") : (role = "user");

    const users = await userService.updateUser(uid, { role });
    if (users && users.error) {
      //   logger.warning(
      //     `${ErrorsName.PRODUCTS_ERROR_NAME} - ${ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE} - ${ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE}`
      //   );
      return CustomError.generateCustomError({
        // name: ErrorsName.PRODUCTS_ERROR_NAME,
        // message: ErrorsMessage.UPDATEPRODUCT_ERROR_MESSAGE,
        // cause: ErrorsCause.UPDATEPRODUCT_ERROR_CAUSE,
        status: 400,
      });
    } else {
      req.session.user.role = role;
      logger.info(`Update user ${uid} to ${role} success`);
      return responder.successResponse(res, users);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

// --------------------------------------------------------------------

export async function restorePassword(req, res) {
  try {
    const email = req.params.email;
    console.log({ email });

    req.user = await userService.getUserByEmail({ email });
    console.log(req.user);
    const response_2 = await postLogin(req, res);
    console.log(response_2);

    req.session.cookie._expires = 3600;

    //   await transport.sendMail({
    //     from: config.nodemailerUser,
    //     to: email,
    //     subject: `Restablecer contraseña`,
    //     html: `
    //     <div>
    //     <h1>Restarblecer contraseña:</h1>
    //     <p>Debe presionar el siguiente boton para restablecer la contraseña de su cuenta;</p>
    //     <a href="/api/v1/users/restorePassword/${email}/${sid}"</a>
    //     <p>Si usted no solicito restablecer la contraseña, no siga el enlace</p>
    //     <br />
    //     <br />
    //     <h3>Muchas gracias por elegirnos, lo esperamos nuevamente pronto, saludos cordiales.</h3>
    //     </div>
    //     `,
    //   });

    return null;
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}
