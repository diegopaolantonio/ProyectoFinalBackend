import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import socket from "./socket.js";
import database from "./mongo.js";
import config from "./config.js";
import passport from "passport";
import { routerApi } from "./routes/index.js";
import __dirname from "./utilis/dirname.js";
import initializePassport from "./auth/passport.js";
import { logger } from "./utilis/logger.js";

// Inicializacion
const app = express();
const { dbUrl, sessionSecret } = config;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/../public`));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `${dbUrl}`,
      ttl: 200,
    }),
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Seteo de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/../views`);
app.set("view engine", "handlebars");

// Conexion a Database
database.connect();

// Servidor
const httpServer = app.listen(`${config.port}`, () => {
  logger.debug(`Server on port ${config.port}`);
});

socket.connect(httpServer);

// Routes
routerApi(app);
