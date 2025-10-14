import { Router } from "express";
import registerController from "../controllers/authControllers/register.controller.js";
import loginController from "../controllers/authControllers/login.controller.js";
import verifyTokenController from "../controllers/authControllers/verifyToken.controller.js";

const router = Router();

// Cria um Usuario no banco
router.post("/register", registerController);

// Gera o token
router.post("/login", loginController);

// Verificar se o token é válido
router.get("/me", verifyTokenController);

export default router;
