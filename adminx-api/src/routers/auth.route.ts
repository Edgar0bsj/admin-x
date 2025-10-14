import { Router } from "express";
import registerController from "../controllers/authControllers/register.controller.js";
import loginController from "../controllers/authControllers/login.controller.js";

const router = Router();

// Registro de novo usuário
router.post("/register", registerController);

// Login e geração de token
router.post("/login", loginController);

// Dados do usuário autenticado
router.get("/me", () => {});

// Logout e revogação de token
router.post("/logout", () => {});

export default router;
