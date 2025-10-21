import type { Request, Response, NextFunction } from "express";
import accountModel from "../../../models/accounts/accountModel.js";

export default async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await accountModel.findByIdAndDelete(id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
