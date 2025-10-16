import { Router } from "express";
import createNewAccount from "../controllers/accountControllers/createNewAccount.controller.js";
import verifyToken from "../controllers/authControllers/verifyToken.controller.js";
import listUserAccounts from "../controllers/accountControllers/listUserAccounts.controller.js";

const router = Router();

// 	Listar contas do usuário
router.get("/", verifyToken, listUserAccounts);

// 	Criar nova conta
router.post("/", verifyToken, createNewAccount);

// 	Detalhes de uma conta específica
router.get("/:id", () => {});

// 	Atualizar conta
router.put("/:id", () => {});

// 	Deletar conta
router.delete("/:id", () => {});

export default router;
