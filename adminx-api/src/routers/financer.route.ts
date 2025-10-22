import { Router } from "express";
import createNewAccount from "../controllers/financerController/accountControllers/createNewAccount.controller.js";
import verifyToken from "../controllers/authControllers/verifyToken.controller.js";
import listUserAccounts from "../controllers/financerController/accountControllers/listUserAccounts.controller.js";
import updateAccount from "../controllers/financerController/accountControllers/updateAccount.controller.js";
import deleteAccount from "../controllers/financerController/accountControllers/deleteAccount.controller.js";
import createCategory from "../controllers/financerController/categoryController/createCategory.controller.js";
import getCategories from "../controllers/financerController/categoryController/getCategories.controller.js";
import updateCategory from "../controllers/financerController/categoryController/updateCategory.controller.js";
import deleteCategory from "../controllers/financerController/categoryController/deleteCategory.controller.js";
import createTransaction from "../controllers/financerController/transactionControllers/createTransaction.controller.js";
import getTransaction from "../controllers/financerController/transactionControllers/getTransaction.controller.js";
import updateTransactions from "../controllers/financerController/transactionControllers/updateTransactions.controller.js";

const router = Router();

/**
 * 	Account
 */

router.get("/account/", verifyToken, listUserAccounts);

router.post("/account/", verifyToken, createNewAccount);

router.put("/account/:id", verifyToken, updateAccount);

router.delete("/account/:id", verifyToken, deleteAccount);

/**
 * 	Category
 */

router.get("/category", verifyToken, getCategories);

router.post("/category", verifyToken, createCategory);

router.put("/category/:id", verifyToken, updateCategory);

router.delete("/category/:id", verifyToken, deleteCategory);

/**
 * 	Transaction
 */

router.post("/transaction", verifyToken, createTransaction);

router.get("/transaction", verifyToken, getTransaction);

router.put("/transaction/:id", verifyToken, updateTransactions);

export default router;
