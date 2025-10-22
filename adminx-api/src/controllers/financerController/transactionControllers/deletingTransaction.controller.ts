import type { Request, Response, NextFunction } from "express";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import type { Account, Transaction } from "../../../interface/iFinancer.js";
import accountModel from "../../../models/financer/accounts/accountModel.js";
import AppError from "../../../server/errs/appError.js";

export default async function deletingTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const transactionRemoved = (await transactionModel.findOneAndDelete({
      _id: id,
    })) as Transaction;
    if (!transactionRemoved) throw new AppError("Conta não encontrada");

    //desfazendo transação
    const { accountId, amount, type } = transactionRemoved;

    const account = (await accountModel.findById(accountId)) as Account;
    if (type === "receita") account.balance -= amount;
    if (type === "despesa") account.balance += amount;

    account.save();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
