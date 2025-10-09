import express from "express";
import authRouter from "../routers/auth.route.js";

export default async function middleware(app: express.Application) {
  app.use("/auth", authRouter);

  console.log("[Middleware]>> Aplicado!");
}
