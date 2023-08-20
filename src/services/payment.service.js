import Stripe from "stripe";
import config from "../config.js";
import { ticketRepository } from "../repositories/index.js";

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(config.stripeSecretKey);
    }

    createPaymentIntent = async (paymentIntentInfo) => {
        const paymentIntent = await this.stripe.paymentIntents.create(paymentIntentInfo);

        return paymentIntent;
    }
}
