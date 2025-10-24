import type { Request, Response, NextFunction } from "express";
import type { userReq } from "../../../interface/iUser.js";
import { budgetValidation } from "../../../models/financer/budget/budgetValidation.js";
import AppError from "../../../server/errs/appError.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import type { Transaction } from "../../../interface/iFinancer.js";
import budgetModel from "../../../models/financer/budget/budgetModel.js";
import categoryModel from "../../../models/financer/category/categoryModel.js";

export default async function createBudget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user as { id: string };

    const { categoryId, amount, period, startDate, endDate } = req.body;

    const data = budgetValidation.parse({
      userId,
      categoryId,
      amount,
      period,
      startDate,
      endDate,
    });

    /**
     * Verificar se a categoria existe
     */
    const category = await categoryModel.findOne({
      _id: data.categoryId,
      userId: data.userId,
    });
    if (!category) throw new AppError("Categoria não encontrada");

    /**
     * Calcular o valor já gasto no período
     */
    const transaction: Transaction[] = await transactionModel.find({
      userId: data.userId,
      categoryId: data.categoryId,
      date: { $gte: data.startDate, $lte: data.endDate },
    });
    const totalSpent: number = transaction.reduce(
      (acc, el) => (el.type === "despesa" ? el.amount + acc : acc),
      0
    );

    /**
     * Salvando os dados
     */
    const result = await budgetModel.create(
      {
        userId,
        categoryId,
        amount,
        spent: totalSpent,
        period,
        startDate,
        endDate,
      },
      { new: true }
    );
    if (!result) throw new AppError("Error ao salvar");

    console.log(result);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
