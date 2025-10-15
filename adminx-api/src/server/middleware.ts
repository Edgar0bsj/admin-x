import express from "express";
import errorHandler from "../errs/errorHandler.js";
import authRouter from "../routers/auth.route.js";
import userRouter from "../routers/user.route.js";

export default async function middleware(app: express.Application) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use(errorHandler);

  console.log("[Middleware]>> Aplicado!");
}
