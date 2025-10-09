import express from "express";
import server from "./server/server.js";
import expressConfig from "./server/expressConfig.js";
import middleware from "./server/middleware.js";
import connectDB from "./database/connection.js";

(async () => {
  const app = express();
  const process = [
    () => connectDB(),
    () => expressConfig(app),
    () => middleware(app),
    () => server(app),
  ];

  for (const bootstrap of process) {
    await bootstrap();
  }
})();
