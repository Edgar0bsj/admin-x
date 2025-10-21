import categorySchema from "../../../models/financer/category/categoryValidation.js";
import categoryModel from "../../../models/financer/category/categoryModel.js";
import type { NextFunction, Request, Response } from "express";
import type { userReq } from "../../../interface/iUser.js";
import type { Category } from "../../../models/financer/category/categoryValidation.js";
import AppError from "../../../server/errs/appError.js";

export default async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = (req as userReq).user;

    const { name, color, icon, type } = req.body;

    const category: Category = categorySchema.parse({
      userId: id,
      name,
      color,
      icon,
      type,
    });

    const newCategory = await categoryModel.create(category);
    if (!newCategory) throw new AppError("Erro ao salvar categoria", 400);

    console.log(newCategory);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
