import express from "express";
import cors from "cors";

export default async function expressConfig(app: express.Application) {
  const corsOptions = {
    origin: "http://localhost:3000",
  };

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));

  console.log("[ExpressConfig]>> Aplicado!");
}
