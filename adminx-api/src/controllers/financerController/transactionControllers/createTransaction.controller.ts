import type { NextFunction, Request, Response } from "express";
import type { userReq } from "../../../interface/iUser.js";
import { CreateTransactionSchema } from "../../../models/financer/transaction/transactionValidation.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import AppError from "../../../server/errs/appError.js";
import accountModel from "../../../models/financer/accounts/accountModel.js";
import type { Account } from "../../../interface/iFinancer.js";

export default async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user;

    const { accountId, categoryId, amount, description, date, type } = req.body;

    const newTransaction = CreateTransactionSchema.parse({
      userId,
      accountId,
      categoryId,
      amount,
      description,
      date,
      type,
    });

    const account: Account | null = await accountModel.findById(
      newTransaction.accountId
    );

    if (!account) throw new AppError("Conta não encontrada", 400);

    if (newTransaction.type === "receita") {
      account.balance += newTransaction.amount;
      await account.save();
    }
    if (newTransaction.type === "despesa") {
      account.balance -= newTransaction.amount;
      await account.save();
    }

    const result = await transactionModel.create(newTransaction);
    if (!result) throw new AppError("Error ao salvar transação", 400);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
