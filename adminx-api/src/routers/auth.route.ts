import { Router } from "express";
import register from "../controllers/authControllers/register.controller.js";
import login from "../controllers/authControllers/login.controller.js";

const router = Router();

// Cria um Usuario no banco
router.post("/register", register);

// Gera o token
router.post("/login", login);

export default router;
