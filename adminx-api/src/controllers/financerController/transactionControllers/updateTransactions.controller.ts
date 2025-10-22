import type { Request, Response, NextFunction } from "express";
import type { userReq } from "../../../interface/iUser.js";
import { CreateTransactionSchema } from "../../../models/financer/transaction/transactionValidation.js";
import AppError from "../../../server/errs/appError.js";
import accountModel from "../../../models/financer/accounts/accountModel.js";
import type { Account, Transaction } from "../../../interface/iFinancer.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";

export default async function updateTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const { id: userId } = (req as userReq).user;

    const { accountId, categoryId, amount, description, date, type } = req.body;

    const transaction = CreateTransactionSchema.parse({
      userId,
      accountId,
      categoryId,
      amount,
      description,
      date,
      type,
    });

    const transactionOld = (await transactionModel.findById(id)) as Transaction;
    const account = (await accountModel.findById(
      transaction.accountId
    )) as Account;

    const amountOld = transactionOld.amount;
    const typeOld = transactionOld.type;

    //Desfazendo a transação
    if (typeOld === "receita") account.balance -= amountOld;
    if (typeOld === "despesa") account.balance += amountOld;

    //Atualizando o valor
    if (transaction.type === "receita") {
      account.balance += transaction.amount;
    }
    if (transaction.type === "despesa") {
      account.balance -= transaction.amount;
    }
    await account.save();

    const newTransaction = await transactionModel.findByIdAndUpdate(
      id,
      transaction,
      { new: true }
    );

    if (!newTransaction) throw new AppError("Error ao atualizar transação");

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
