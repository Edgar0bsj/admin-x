import type { Request, Response, NextFunction } from "express";
import type { iUserReq } from "../../interface/iUser.js";
import accountModel from "../../models/accounts/accountModel.js";
import mongoose from "mongoose";

export default async function listUserAccounts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const _userId = (req as iUserReq).user;

    const userObjectId = new mongoose.Types.ObjectId(_userId?.id);

    const accounts = await accountModel.find({ userId: userObjectId });

    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
}
