import { Router } from "express";
import getUserData from "../controllers/userControllers/getUserData.controller.js";
import updateUserData from "../controllers/userControllers/updateUserData.controller.js";
import deleteUserAccount from "../controllers/userControllers/deleteUserAccount.controller.js";
import verifyToken from "../controllers/authControllers/verifyToken.controller.js";

const router = Router();

// Obter dados do usuário
router.get("/", verifyToken, getUserData);

// Atualizar dados do usuário
router.put("/", verifyToken, updateUserData);

// Deletar conta do usuário
router.delete("/", verifyToken, deleteUserAccount);

export default router;
