import winston from "winston";
import __dirname from "./dirname.js";
import config from "../config.js";

const customLevel = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "magenta",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const devLogger = winston.createLogger({
  levels: customLevel.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.colorize({ colors: customLevel.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevel.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.colorize({ colors: customLevel.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: `${__dirname}/../../files/error.log`,
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.simple()
      ),
    }),
  ],
});

const logger = config.environment === "production" ? prodLogger : devLogger;

export const addHttpLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} en ${req.url}`);
  next();
};

export { logger };
