import type { userReq } from "../../../interface/iUser.js";
import type { Request, Response, NextFunction } from "express";
import budgetModel from "../../../models/financer/budget/budgetModel.js";
import AppError from "../../../server/errs/appError.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import type { iBudget, Transaction } from "../../../interface/iFinancer.js";

export default async function specificBudget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user as { id: string };

    const { id: _id } = req.params;

    const budget = (await budgetModel.findOne({ _id, userId })) as iBudget;
    if (!budget) throw new AppError("Orçamento não encontrado", 400);

    const transactions: Transaction[] = await transactionModel.find({
      userId,
      categoryId: budget.categoryId,
      type: "despesa",
      date: { $gte: budget.startDate, $lte: budget.endDate },
    });

    const totalSpent = transactions.reduce((acc, el) => el.amount + acc, 0);

    const result = {
      _id: budget._id,
      userId: budget.userId,
      categoryId: budget.categoryId,
      amount: budget.amount,
      spent: totalSpent,
      period: budget.period,
      startDate: budget.startDate,
      endDate: budget.endDate,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    };

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
