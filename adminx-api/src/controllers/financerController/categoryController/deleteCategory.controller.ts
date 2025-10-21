import categoryModel from "../../../models/financer/category/categoryModel.js";
import type { NextFunction, Request, Response } from "express";
import AppError from "../../../server/errs/appError.js";

export default async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const deleteCategory = await categoryModel.findByIdAndDelete(id);
    if (!deleteCategory) throw new AppError("Erro ao deletar categoria", 400);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
