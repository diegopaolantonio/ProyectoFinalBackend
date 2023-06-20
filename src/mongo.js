import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "./utilis/logger.js";

const { dbUrl } = config;

const database = {
  connect: async () => {
    try {
      await mongoose.connect(dbUrl);
    } catch (error) {
      logger.fatal(`${error}`);
    }
  },
};

export default database;
