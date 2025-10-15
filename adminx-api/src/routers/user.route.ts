import { Router } from "express";
import getUserData from "../controllers/userControllers/getUserData.controller.js";
import updateUserData from "../controllers/userControllers/updateUserData.controller.js";
import deleteUserAccount from "../controllers/userControllers/deleteUserAccount.controller.js";
import checkingToken from "../controllers/authControllers/verifyToken.controller.js";

const router = Router();

// Obter dados do usuário
router.get("/:id", checkingToken, getUserData);

// Atualizar dados do usuário
router.put("/:id", checkingToken, updateUserData);

// Deletar conta do usuário
router.delete("/:id", checkingToken, deleteUserAccount);

export default router;
