import type { userReq } from "../../../interface/iUser.js";
import type { Request, Response, NextFunction } from "express";
import { budgetValidation } from "../../../models/financer/budget/budgetValidation.js";
import budgetModel from "../../../models/financer/budget/budgetModel.js";

export default async function updateBudget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user as { id: string };

    const { id } = req.params;

    const { categoryId, amount, period, startDate, endDate } = req.body;

    const budgetUpdate = budgetValidation.partial().parse({
      userId,
      categoryId,
      amount,
      period,
      startDate,
      endDate,
    });

    const result = await budgetModel.findByIdAndUpdate(id, budgetUpdate, {
      new: true,
    });

    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
