import mongoose from "mongoose";

const ticketCollection = "Ticket";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  soldProducts: {
    type: [
      {
        product: mongoose.Types.ObjectId,
        quantity: Number,
      },
    ],
    default: [],
  },
  unsoldProducts: {
    type: [
      {
        product: mongoose.Types.ObjectId,
        quantity: Number,
      },
    ],
    default: [],
  },
  payment_complete: {
    type: Boolean,
    default: false,
  }
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export { ticketModel };
