import nodemailer from "nodemailer";
import config from "../config.js";

const transport = nodemailer.createTransport({
  service: config.nodemailerService,
  port: config.nodemailerPort,
  auth: {
    user: config.nodemailerUser,
    pass: config.nodemailerPassword,
  },
});

export default transport;
