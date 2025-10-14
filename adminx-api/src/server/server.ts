import express from "express";
import config from "../config/env.js";

export default async function server(app: express.Application) {
  app.listen(config.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${config.PORT}`);
  });
}
