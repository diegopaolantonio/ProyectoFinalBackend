import cartsRouter from "./carts.router.js";
import messagesRouter from "./messages.router.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import ticketsRouter from "./tickets.router.js";
import viewsRouter from "./views.router.js";
import usersRouter from "./users.router.js";
import paymentsRouter from "./payments.router.js";
import { Router } from "express";
import { errorMiddleware } from "../errors/error.middleware.js";
import { addHttpLogger } from "../utilis/logger.js";
import __dirname from "../dirname.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce Programacion Backend 39715",
      description: "Documentacion que soporta el sistema del ecommerce de proyecto final de Programacion Backend 39715",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const spec = swaggerJSDoc(swaggerOptions);

// Routes
export function routerApi(app) {
  const router = Router();

  app.use(addHttpLogger);
  app.use("/", viewsRouter);
  app.use("/apiDocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  app.use("/api/v1", router);
  app.use(errorMiddleware);

  router.use("/carts", cartsRouter);
  router.use("/messages", messagesRouter);
  router.use("/products", productsRouter);
  router.use("/tickets", ticketsRouter);
  router.use("/sessions", sessionsRouter);
  router.use("/users", usersRouter);
  router.use("/payments", paymentsRouter);
}
