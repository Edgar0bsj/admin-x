import type { Request, Response, NextFunction } from "express";
import type { userReq } from "../../../interface/iUser.js";
import budgetModel from "../../../models/financer/budget/budgetModel.js";
import AppError from "../../../server/errs/appError.js";
import { budgetValidation } from "../../../models/financer/budget/budgetValidation.js";
import type { iBudget, Transaction } from "../../../interface/iFinancer.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";

interface Filter {
  userId: string;
  period?: unknown;
  categoryId?: unknown;
}

export default async function listBudgets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user;

    const { period, categoryId } = req.query;

    const filter = { userId } as Filter;
    if (period) {
      const periodData = budgetValidation.partial().parse({ period });
      filter.period = periodData.period;
    }
    if (categoryId) {
      const categoryIdData = budgetValidation.partial().parse({ categoryId });
      filter.categoryId = categoryIdData.categoryId;
    }

    /**
     * Buscando orçamentos
     */
    const budgets: iBudget[] = await budgetModel.find(filter);
    if (!budgets.length) res.status(200).json([]);

    const result = await Promise.all(
      budgets.map(async (el) => {
        const transactions: Transaction[] = await transactionModel.find({
          userId,
          categoryId: el.categoryId,
          date: { $gte: el.startDate, $lte: el.endDate },
        });

        const totalSpent = transactions.reduce(
          (acc, e) => (e.type === "despesa" ? acc + e.amount : acc),
          0
        );

        return {
          _id: el._id,
          userId: el.userId,
          categoryId: el.categoryId,
          amount: el.amount,
          spent: totalSpent,
          period: el.period,
          startDate: el.startDate,
          endDate: el.endDate,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
        };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
