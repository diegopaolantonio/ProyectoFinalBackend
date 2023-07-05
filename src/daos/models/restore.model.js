import mongoose from "mongoose";

const restoreCollection = "restorePassword";

const restoreSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
  expirateDate: {
    type: Date,
    required: true,
  },
});

const restoreModel = new mongoose.model(restoreCollection, restoreSchema);

export { restoreModel };
