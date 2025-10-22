import type { Request, Response, NextFunction } from "express";
import accountModel from "../../../models/financer/accounts/accountModel.js";
import mongoose from "mongoose";
import type { userReq } from "../../../interface/iUser.js";

export default async function listUserAccounts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = (req as userReq).user;

    const userObjectId = new mongoose.Types.ObjectId(id);

    const accounts = await accountModel.find({ userId: userObjectId });

    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
}
