import type { Request, Response, NextFunction } from "express";
import AppError from "../../errs/appError.js";
import userModel from "../../models/users/userModel.js";

export default async function deleteUserAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("id ausente", 400);

    const user = await userModel.findByIdAndDelete(id);
    if (!user) throw new AppError("Usuario não encontrado", 400);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
