import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "Carts",
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  profile: {
    type: String,
  },
  documents: {
    type: [{
      name: String,
      reference: {
        type: String,
        enum: ["identificacion", "domicilio", "cuenta"],
      },
    }],
    default: [],
  },
  verified_documentation: {
    type: String,
    enum: ["none", "partial", "complete", "profile"],
    default: "none",
  },
  last_connection: {
    type: Date,
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };
