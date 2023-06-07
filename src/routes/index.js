import cartsRouter from "./carts.router.js";
import messagesRouter from "./messages.router.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import ticketsRouter from "./tickets.router.js";
import viewsRouter from "./views.router.js";
import { Router } from "express";

export function routerApi(app) {
  const router = Router();

  app.use("/", viewsRouter);
  app.use("/api/v1", router);

  router.use("/carts", cartsRouter);
  router.use("/messages", messagesRouter);
  router.use("/products", productsRouter);
  router.use("/tickets", ticketsRouter);
  router.use("/sessions", sessionsRouter);
}