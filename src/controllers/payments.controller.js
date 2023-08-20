import { ticketService, paymentService } from "../services/index.js";
import config from "../config.js";
import transport from "../middlewares/nodemailer.js";
import { logger } from "../utilis/logger.js";
import { responder } from "../traits/Responder.js";
import {
  ErrorsName,
  ErrorsCause,
  ErrorsMessage,
} from "../errors/error.enum.js";
import CustomError from "../errors/customError.js";

export async function createPaymentIntent(req, res) {
  try {
    const ticket = req.body.result;
    console.log(req.body);

    const result = await paymentService.createPaymentIntent(ticket);

    if (result && result.error) {
      logger.warning(
        `${ErrorsName.CARTS_ERROR_NAME} - ${ErrorsMessage.TICKET_ERROR_MESSAGE} - ${ErrorsCause.TICKET_ERROR_CAUSE}`
      );
      return CustomError.generateCustomError({
        name: ErrorsName.CARTS_ERROR_NAME,
        message: ErrorsMessage.TICKET_ERROR_MESSAGE,
        cause: ErrorsCause.TICKET_ERROR_CAUSE,
        status: 400,
      });
    } else {
      ticket.payment_complete = true;
      const uploadedTicket = await ticketService.updateTicket(ticket.tid, ticket)
      await transport.sendMail({
        from: config.nodemailerUser,
        to: ticket.createdTicket.purchaser,
        subject: `Compra finalizada ${ticket.createdTicket.code}`,
        html: `
              <div>
              <h1>Datos de la compra:</h1>
              <p>Codigo: ${ticket.createdTicket.code}</p>
              <p>Fecha: ${ticket.createdTicket.purchase_datetime}</p>
              <p>Monto: ${ticket.createdTicket.amount}</p>
              <p>Comprador: ${ticket.createdTicket.purchaser}</p>
              <br />
              <h2>Ids de los productos comprados:</h2>
              <p>${ticket.productsAdded}</p>
              </h2>
              <h2>Ids de los productos que no pudieron procesarse por falta de stock:</h2>
              <p>${ticket.productsNotAdded}</p>
              <br />
              <br />
              <h3>Muchas gracias por elegirnos, que disfrute sus productos, lo esperamos nuevamente pronto, saludos cordiales.</h3>
              </div>
              `,
      });

      logger.info(`Create ticket ${result.createdTicket.code} success`);
      return responder.successResponse(res, result);
    }
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}
