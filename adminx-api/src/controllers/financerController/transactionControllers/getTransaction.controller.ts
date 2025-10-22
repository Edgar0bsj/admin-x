import type { Request, NextFunction, Response } from "express";
import type { userReq } from "../../../interface/iUser.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import AppError from "../../../server/errs/appError.js";

export default async function getTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user;

    const transaction = await transactionModel.find({ userId });

    if (transaction.length <= 0)
      throw new AppError("Error ao buscar transações", 400);

    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
}
