import { ticketService } from "../services/index.js";
import Stripe from "stripe";
import config from "../config.js";
import transport from "../middlewares/nodemailer.js";
import { logger } from "../utilis/logger.js";
import { responder } from "../traits/Responder.js";

const stripe = new Stripe(config.stripeSecretKey);

export async function getPayment(req, res) {
  try {
    const tid = req.params.tid;
    const ticket = await ticketService.getTicketById(tid);

    res.render("payment", {
      name: `${req.session.user.first_name} ${req.session.user.last_name}`,
      email: req.session.user.email,
      amount: ticket.amount,
      tid: tid,
    });
  } catch (error) {
    return responder.errorResponse(res, error.message, error.status);
  }
}

export async function postCharge(req, res) {
  try {
    const tid = req.params.tid;
    console.log(tid);
    const ticket = await ticketService.getTicketById(tid);
    console.log(ticket);
    stripe.customers
      .create({
        name: req.body.name,
        email: req.body.email,
        source: req.body.stripeToken,
      })
      .then((customer) =>
        stripe.charges.create({
          amount: req.body.amount * 100,
          currency: "usd",
          customer: customer.id,
          metadata: {
            Ticket: JSON.stringify(ticket, null, "\t"),
          },
        })
      )
      .then(async (result) => {
        ticket.payment_complete = true;
        await ticketService.updateTicket(tid, ticket);
        await transport.sendMail({
          from: config.nodemailerUser,
          to: ticket.purchaser,
          subject: `Compra finalizada ${ticket.code}`,
          html: `
                  <div>
                  <h1>Datos de la compra:</h1>
                  <p>Codigo: ${ticket.code}</p>
                  <p>Fecha: ${ticket.purchase_datetime}</p>
                  <p>Monto: ${ticket.amount}</p>
                  <p>Comprador: ${ticket.purchaser}</p>
                  <br />
                  <h2>Productos procesados:</h2>
                  // <p>${ticket.soldProducts}</p>
                  </h2>
                  <h2>Productos que no pudieron procesarse por falta de stock:</h2>
                  // <p>${ticket.unsoldProducts}</p>
                  <br />
                  <br />
                  <h3>Muchas gracias por elegirnos, que disfrute sus productos, lo esperamos nuevamente pronto, saludos cordiales.</h3>
                  </div>
                  `,
        });

        logger.info("Payment completed success");

        res.render("completed", {
          code: result.status,
          message1: "",
          message2: "",
        });
      })
      .catch((err) => {
        console.log(err);
        logger.info(err.raw);
        res.render("completed", {
          code: err.raw.code,
          message1: err.raw.decline_code,
          message2: err.raw.message,
          tid: tid,
        });
      });
  } catch (err) {
    res.send(err);
  }
}
