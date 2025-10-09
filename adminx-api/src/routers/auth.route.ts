import { Router } from "express";
import registerController from "../controllers/authControllers/registerController.js";
import loginController from "../controllers/authControllers/loginController.js";
import checkToken from "../controllers/authControllers/checkTokenController.js";

const router = Router();

// Registro
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Verificar token
router.get("/check", checkToken);

export default router;
