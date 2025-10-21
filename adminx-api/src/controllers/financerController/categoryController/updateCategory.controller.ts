import categorySchema from "../../../models/financer/category/categoryValidation.js";
import categoryModel from "../../../models/financer/category/categoryModel.js";
import type { NextFunction, Request, Response } from "express";
import type { Category } from "../../../models/financer/category/categoryValidation.js";
import AppError from "../../../server/errs/appError.js";

export default async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const { name, color, icon, type } = req.body;

    const category: Category = categorySchema.parse({
      userId: id, //<- Gabiarra ^,^
      name,
      color,
      icon,
      type,
    });

    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: category.name,
        color: category.color,
        icon: category.icon,
        type: category.type,
      },
      {
        new: true,
      }
    );
    if (!updateCategory) throw new AppError("Erro ao salvar categoria", 400);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
