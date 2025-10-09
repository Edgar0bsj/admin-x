import mongoose from "mongoose";
import env from "../config/env.js";

async function connectDB() {
  try {
    await mongoose.connect(env.DB_URI);
    console.log("[MongoDB]>> Conectado !");
  } catch (error) {
    console.error("[MongoDB]>> Erro !:", (<Error>error).message);
    process.exit(1);
  }
}

export default connectDB;
