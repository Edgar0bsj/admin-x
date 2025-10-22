import type { Request, Response, NextFunction } from "express";
import accountModel from "../../../models/financer/accounts/accountModel.js";
import type { Account } from "../../../interface/iFinancer.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import AppError from "../../../server/errs/appError.js";

export default async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const accountRemoved = (await accountModel.findByIdAndDelete(
      id
    )) as Account;

    //Deletando todas as transações refetente a conta
    const { _id: accountId } = accountRemoved;

    const result = await transactionModel.deleteMany({ accountId });

    if (!result.acknowledged) throw new AppError("Error ao excluir transações");

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
