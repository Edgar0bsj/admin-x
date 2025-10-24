import type { Request, Response, NextFunction } from "express";
import type { userReq } from "../../../interface/iUser.js";
import budgetModel from "../../../models/financer/budget/budgetModel.js";
import transactionModel from "../../../models/financer/transaction/transactionModel.js";
import type {
  BudgetsLean,
  TransactionLean,
} from "../../../interface/iFinancer.js";

interface Result {
  totalBudget?: number;
  totalSpent?: number;
  remaining?: number;
  budgets?: BudgetDetails[];
}

interface BudgetDetails {
  categoryId?: string;
  categoryName?: string;
  amount?: number;
  spent?: number;
  percentage?: number;
  status?: "No caminho certo" | "Atenção" | "Excedido";
}

export default async function getBudgetSummary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = (req as userReq).user as { id: string };

    const budgets = (await budgetModel
      .find({ userId })
      .populate("categoryId")) as BudgetsLean[];

    const transactions: unknown = await transactionModel.find({
      userId,
      type: "despesa",
    });

    /**
     * 	totalBudget
     */
    const totalBudget = budgets.length;

    /**
     * 	totalSpent
     */

    const totalSpent = (transactions as TransactionLean[]).reduce(
      (acc, el) => el.amount + acc,
      0
    );

    /**
     * remaining
     */
    const totalAmount = budgets.reduce((acc, el) => el.amount + acc, 0);
    const remaining = totalAmount - totalSpent;

    /**
     * budgets summary
     */
    const budgetsSummary = () => {
      //Criando molde
      const budgetsBuilder = budgets.map((el) => {
        return {
          categoryId: (el as any).categoryId._id,
          categoryName: (el as any).categoryId.name,
          amount: el.amount,
          spent: 0,
          percentage: 0,
          status: "",
        };
      });

      const builder = budgetsBuilder.map((elemento) => {
        const spent = (transactions as TransactionLean[]).reduce((acc, e) => {
          if (
            e.categoryId.toString() === elemento.categoryId.toString() &&
            e.type === "despesa"
          ) {
            return e.amount + acc;
          } else {
            return acc;
          }
        }, 0);

        const percentage = (spent / elemento.amount) * 100;

        const status =
          percentage >= 100
            ? "Excedido"
            : percentage >= 50
            ? "Atenção"
            : percentage >= 1
            ? "No caminho certo"
            : "ERROR!";

        return {
          ...elemento,
          spent: spent,
          percentage,
          status,
        };
      });

      return builder;
    };

    const budgetDetails = budgetsSummary() as BudgetDetails[];

    const result: Result = {
      totalBudget,
      totalSpent,
      remaining,
      budgets: budgetDetails,
    };

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
