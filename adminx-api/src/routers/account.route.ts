import { Router } from "express";
import createNewAccount from "../controllers/accountControllers/createNewAccount.controller.js";
import verifyToken from "../controllers/authControllers/verifyToken.middleware.js";
import listUserAccounts from "../controllers/accountControllers/listUserAccounts.controller.js";
import updateAccount from "../controllers/accountControllers/updateAccount.controller.js";
import deleteAccount from "../controllers/accountControllers/deleteAccount.controller.js";

const router = Router();

// 	Listar contas do usuário
router.get("/", verifyToken, listUserAccounts);

// 	Criar nova conta
router.post("/", verifyToken, createNewAccount);

// 	Atualizar conta
router.put("/:id", verifyToken, updateAccount);

// 	Deletar conta
router.delete("/:id", verifyToken, deleteAccount);

export default router;
