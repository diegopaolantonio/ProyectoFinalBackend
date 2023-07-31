import transport from "../middlewares/nodemailer.js";
import config from "../config.js";
import { userService, restoreService } from "../services/index.js";
import { responder } from "../traits/Responder.js";
import { logger } from "../utilis/logger.js";
import {
  createHash,
  isValidPassword,
  isValidRestore,
} from "../utilis/bcrypt.js";

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
      logger.warning(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.GETUSERS_ERROR_MESSAGE} - ${ErrorsCause.DATABASE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.GETUSERS_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
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
      logger.warning(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.GETPRODUCTSBYID_ERROR_MESSAGE} - ${ErrorsCause.GETUSERBYID_ERROR_MESSAGE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.GETUSERBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
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
      logger.warning(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.GETUSERBYID_ERROR_MESSAGE} - ${ErrorsCause.GETBYID_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.GETUSERBYID_ERROR_MESSAGE,
        cause: ErrorsCause.GETBYID_ERROR_CAUSE,
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
      logger.error(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.CREATEUSER_ERROR_MESSAGE} - ${ErrorsCause.CREATEUSER_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.CREATEUSER_ERROR_MESSAGE,
        cause: ErrorsCause.CREATEUSER_ERROR_CAUSE,
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
      logger.warning(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.UPDATEUSER_ERROR_MESSAGE} - ${ErrorsCause.UPDATEUSER_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.UPDATEUSER_ERROR_MESSAGE,
        cause: ErrorsCause.UPDATEUSER_ERROR_CAUSE,
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
      logger.warning`${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.DELETEUSER_ERROR_MESSAGE} - ${ErrorsCause.DELETE_ERROR_CAUSE}`();
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.DELETEUSER_ERROR_MESSAGE,
        cause: ErrorsCause.DELETE_ERROR_CAUSE,
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
      logger.warning(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.UPDATEROLE_ERROR_MESSAGE} - ${ErrorsCause.UPDATEROLE_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.USERS_ERROR_NAME,
        message: ErrorsMessage.UPDATEROLE_ERROR_MESSAGE,
        cause: ErrorsCause.UPDATEROLE_ERROR_CAUSE,
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

export async function restorePasswordRequest(req, res) {
  try {
    const email = req.params.email;

    const user = await userService.getUserByEmail({ email });

    if (!user) {
      logger.warning(
        `${ErrorsName.USERS_ERROR_NAME} - ${ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE} - ${ErrorsCause.RESTORE_REQUEST_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.RESTORE_ERROR_NAME,
        message: ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE,
        cause: ErrorsCause.RESTORE_REQUEST_ERROR_CAUSE,
        status: 400,
      });
    } else {
      const createDate = Date.now();
      const expirateDate = createDate + 3600000;
      const newRestore = { email, createDate, expirateDate };

      const restores = await restoreService.getRestoreByEmail(email);

      for (let i = 0; i < restores.length; i++) {
        const result = await restoreService.deleteRestoreByEmail(email);
      }

      const restore = await restoreService.createRestore(newRestore);

      await transport.sendMail({
        from: config.nodemailerUser,
        to: email,
        subject: `Restablecer contraseña`,
        html: `
        <div>
        <h1>Restarblecer contraseña:</h1>
        <p>Debe presionar el siguiente boton para restablecer la contraseña de su cuenta;</p>
        <a href="http://localhost:8080/restorePassword/${restore._id}"><button>Restablecer</button></a>
        <p>Si usted no solicito restablecer la contraseña, no siga el enlace</p>
        <br />
        <br />
        <h3>Muchas gracias por elegirnos, lo esperamos nuevamente pronto, saludos cordiales.</h3>
        </div>
        `,
      });
      logger.info(`Restore request id ${restore._id} send to ${email} success`);
      return responder.successResponse(res, email);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function restorePassword(req, res) {
  try {
    const { rid, email, confirmPassword } = req.body;
    const newPassword = createHash(req.body.newPassword);

    const restore = await restoreService.getRestoreById(rid);

    if (restore.email === email) {
      if (isValidRestore(newPassword, confirmPassword)) {
        const user = await userService.getUserByEmail({ email });

        if (!isValidPassword(user, confirmPassword)) {
          const { _id } = user;
          const password = newPassword;

          await userService.updateUser(_id, { password });

          const restores = await restoreService.getRestoreByEmail(email);
          for (let i = 0; i < restores.length; i++) {
            const result = await restoreService.deleteRestoreByEmail(email);
          }

          await transport.sendMail({
            from: config.nodemailerUser,
            to: email,
            subject: `Contraseña restablecida`,
            html: `
                <div>
                <h1>Contraseña restablecida:</h1>
                <p>Se actualizo la contraseña exitosamente.</p>
                <br />
                <br />
                <h3>Muchas gracias por elegirnos, lo esperamos nuevamente pronto, saludos cordiales.</h3>
                </div>
                `,
          });

          logger.info(`Password restored success`);
          return responder.successResponse(res, email);
        } else {
          logger.warning(
            `${ErrorsName.RESTORE_ERROR_NAME} - ${ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE} - ${ErrorsCause.RESTORE_REQUEST_NEW_PASSWORD_ERROR_CAUSE}`
          );
          return CustomError.generateCustomError({
            name: ErrorsName.RESTORE_ERROR_NAME,
            message: ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE,
            cause: ErrorsCause.RESTORE_REQUEST_NEW_PASSWORD_ERROR_CAUSE,
            status: 400,
          });
        }
      } else {
        logger.warning(
          `${ErrorsName.RESTORE_ERROR_NAME} - ${ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE} - ${ErrorsCause.RESTORE_REQUEST_PASSWORDS_ERROR_CAUSE}`
        );
        return CustomError.generateCustomError({
          name: ErrorsName.RESTORE_ERROR_NAME,
          message: ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE,
          cause: ErrorsCause.RESTORE_REQUEST_PASSWORDS_ERROR_CAUSE,
          status: 400,
        });
      }
    } else {
      logger.warning(
        `${ErrorsName.RESTORE_ERROR_NAME} - ${ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE} - ${ErrorsCause.RESTORE_REQUEST_EMAIL_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.RESTORE_ERROR_NAME,
        message: ErrorsMessage.RESTORE_REQUEST_ERROR_MESSAGE,
        cause: ErrorsCause.RESTORE_REQUEST_EMAIL_ERROR_CAUSE,
        status: 400,
      });
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function addDocuments(req, res) {
  let documents = [];
  let cont = 0;
  let uploaded = [];
  const documentation = req.body;
  const files = req.files;

  if (!files.identificacion && !files.domicilio && !files.cuenta) {
    return res.status(400);
  }

  let user = await userService.getUserById(documentation.uid);
  for (let i = 0; i < user.documents.length; i++) {
    if (user.documents[i].reference === "identificacion") {
      documents[0] = user.documents[i];
    }
    if (user.documents[i].reference === "domicilio") {
      documents[1] = user.documents[i];
    }
    if (user.documents[i].reference === "cuenta") {
      documents[2] = user.documents[i];
    }
  }

  if (files.identificacion) {
    documents[0] = {
      name: `http://localhost:8080/documents/${files.identificacion[0].filename}`,
      reference: "identificacion",
    };
    uploaded[cont] = documents[0].reference;
    cont++;
  } else {
    if (!documents[0]) {
      documents[0] = {
        name: null,
        reference: null,
      };
    }
  }

  if (files.domicilio) {
    documents[1] = {
      name: `http://localhost:8080/documents/${files.domicilio[0].filename}`,
      reference: "domicilio",
    };
    uploaded[cont] = documents[1].reference;
    cont++;
  } else {
    if (!documents[1]) {
      documents[1] = {
        name: null,
        reference: null,
      };
    }
  }

  if (files.cuenta) {
    documents[2] = {
      name: `http://localhost:8080/documents/${files.cuenta[0].filename}`,
      reference: "cuenta",
    };
    uploaded[cont] = documents[2].reference;
    cont++;
  } else {
    if (!documents[2]) {
      documents[2] = {
        name: null,
        reference: null,
      };
    }
  }

  if (documents[0].name || documents[1].name || documents[2].name) {
    if (documents[0].name && documents[1].name && documents[2].name) {
      user.verified_documentation = "complete";
    } else user.verified_documentation = "partial";
  } else user.verified_documentation = "none";

  user.documents = documents;

  await userService.updateUser(documentation.uid, user);

  return res.status(200).send({ status: "Success", payload: uploaded });
}

export async function addProfiles(req, res) {
  console.log("diego");
  const documentation = req.body;
  const files = req.files;
  console.log(documentation);
  console.log(files.profile);

  if (!files.profile) {
    return res.status(400);
  }

  let user = await userService.getUserById(documentation.uid);

  if (files.profile) {
    user.profile = `http://localhost:8080/profiles/${files.profile[0].filename}`;
  }

  await userService.updateUser(documentation.uid, user);

  return res.status(200).send({ status: "Success", payload: user });
}
