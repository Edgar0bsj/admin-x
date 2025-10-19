import type { Request, Response, NextFunction } from "express";
import AppError from "../../errs/appError.js";
import type { iUserReq } from "../../interface/iUser.js";
import accountVerify from "../../validation/accountValidation/account.validation.js";
import accountModel from "../../models/accounts/accountModel.js";

export default async function createNewAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as iUserReq).user?.id;

    const { name, type, balance } = req.body;
    if (!name) throw new AppError("Name ausente !", 400);
    if (!type) throw new AppError("Type ausente !", 400);
    if (!balance) throw new AppError("Balance ausente !", 400);

    const account = accountVerify.parse({ name, type, balance });

    await accountModel.create({
      userId,
      name: account.name,
      type: account.type,
      balance: account.balance,
    });

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

/**
 {
  "userId": ObjectId,
  name: string,
  type: "Crédito" | "Débito", // débito, crédito
  balance: number,
}
 */
