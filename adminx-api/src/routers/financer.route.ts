import { Router } from "express";
import createNewAccount from "../controllers/financerController/accountControllers/createNewAccount.controller.js";
import verifyToken from "../controllers/authControllers/verifyToken.controller.js";
import listUserAccounts from "../controllers/financerController/accountControllers/listUserAccounts.controller.js";
import updateAccount from "../controllers/financerController/accountControllers/updateAccount.controller.js";
import deleteAccount from "../controllers/financerController/accountControllers/deleteAccount.controller.js";
import createCategory from "../controllers/financerController/categoryController/createCategory.controller.js";

const router = Router();

/**
 * 	Account
 */

// 	Listar contas do usuário
router.get("/account/", verifyToken, listUserAccounts);

router.post("/account/", verifyToken, createNewAccount);

router.put("/account/:id", verifyToken, updateAccount);

router.delete("/account/:id", verifyToken, deleteAccount);

/**
 * 	Category
 */

router.get("/category", () => {});

router.post("/category", verifyToken, createCategory);

router.put("/category/:id", () => {});

router.delete("/category/:id", () => {});

export default router;
