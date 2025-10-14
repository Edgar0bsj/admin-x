import express from "express";
import authRouter from "../routers/auth.route.js";
import errorHandler from "../errs/errorHandler.js";

export default async function middleware(app: express.Application) {
  app.use("/auth", authRouter);

  app.use(errorHandler);

  console.log("[Middleware]>> Aplicado!");
}
