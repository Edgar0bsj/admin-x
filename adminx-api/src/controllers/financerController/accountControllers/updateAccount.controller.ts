import type { Request, Response, NextFunction } from "express";
import AppError from "../../../errs/appError.js";
import accountSchema from "../../../models/accounts/accountValidation.js";
import accountModel from "../../../models/accounts/accountModel.js";

export default async function updateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, type, balance } = req.body;
    if (!name) throw new AppError("name ausente!", 400);
    if (!type) throw new AppError("type ausente!", 400);
    if (!balance) throw new AppError("balance ausente!", 400);

    const account = accountSchema.parse({ userId: id, name, type, balance });

    await accountModel.findByIdAndUpdate(id, {
      name: account.name,
      type: account.type,
      balance: account.balance,
    });
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
