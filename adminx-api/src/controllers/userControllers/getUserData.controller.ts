import type { Request, Response, NextFunction } from "express";
import userModel from "../../models/users/userModel.js";
import AppError from "../../errs/appError.js";

export default async function getUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("id ausente", 400);

    const user = await userModel.findById(id).select("-passwordHash");
    if (!user) throw new AppError("Usuário não encontrado", 404);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
