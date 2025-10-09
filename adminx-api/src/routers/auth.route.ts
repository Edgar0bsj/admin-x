import { Router } from "express";
import registerController from "../controllers/authControllers/registerController.js";
import loginController from "../controllers/authControllers/loginController.js";
import profileController from "../controllers/authControllers/profileController.js";

const router = Router();

type Users = {
  username: string;
  password: string;
};

const users: Users[] = []; // Simulação de banco de dados
const SECRET = "minha_chave_secreta";

// Registro
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Rota protegida
router.get("/profile", profileController);

export default router;
