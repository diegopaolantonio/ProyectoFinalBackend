import { messageService } from "../services/index.js";
import { responder } from "../traits/Responder.js";

import CustomError from "../errors/costumError.js";
import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";

export async function getMessages(req, res) {
  try {
    const messages = await messageService.getMessages();
    if (messages && messages.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.MESSAGES_ERROR_NAME,
        message: ErrorsMessage.GETMESSAGES_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, messages);
    }
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.MESSAGES_ERROR_NAME,
      message: ErrorsMessage.GETMESSAGES_ERROR_MESSAGE,
      cause: ErrorsCause.DATABASE_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}

export async function addMessage(req, res) {
  try {
    const message = req.body;
    const messages = await messageService.addMessage(message);
    if (messages && messages.error) {
      return CustomError.generateCustomError({
        name: ErrorsName.MESSAGES_ERROR_NAME,
        message: ErrorsMessage.ADDMESSAGE_ERROR_MESSAGE,
        cause: ErrorsCause.DATABASE_ERROR_CAUSE,
      });
      // return responder.errorResponse(res, products.error, 400);
    } else {
      return responder.successResponse(res, messages);
    }
  } catch (error) {
    return CustomError.generateCustomError({
      name: ErrorsName.MESSAGES_ERROR_NAME,
      message: ErrorsMessage.ADDMESSAGE_ERROR_MESSAGE,
      cause: ErrorsCause.DATABASE_ERROR_CAUSE,
    });
    // return responder.errorResponse(res, error.message);
  }
}
