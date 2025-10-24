import type { Request, Response, NextFunction } from "express";
import type { userReq } from "../../../interface/iUser.js";
import budgetModel from "../../../models/financer/budget/budgetModel.js";
import AppError from "../../../server/errs/appError.js";

export default async function removeBudget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user as { id: string };

    const { id } = req.params;

    const budget = await budgetModel.findOneAndDelete(
      { _id: id, userId },
      { new: true }
    );
    if (!budget) throw new AppError("Error ao deletar registro");

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
