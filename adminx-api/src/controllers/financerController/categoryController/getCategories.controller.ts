import categoryModel from "../../../models/financer/category/categoryModel.js";
import type { NextFunction, Request, Response } from "express";
import type { userReq } from "../../../interface/iUser.js";
import mongoose from "mongoose";

export default async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = (req as userReq).user;
    const userObjectId = new mongoose.Types.ObjectId(id);

    const categories = await categoryModel.find({ userId: userObjectId });

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}
