import type { Request, Response, NextFunction } from "express";
import userModel from "../../models/users/userModel.js";
import AppError from "../../errs/appError.js";
// import userValidation from "../../validation/userValidation/register.validation.js";
import bcrypt from "bcryptjs";

export default async function updateUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) throw new AppError("id ausente", 400);

    const { name, email, password } = req.body;
    if (!name) throw new AppError("name ausente", 400);
    if (!email) throw new AppError("email ausente", 400);
    if (!password) throw new AppError("password ausente", 400);

    // const newCredentials = userValidation.parse({ name, email, password });

    // const passwordHash = await bcrypt.hash(newCredentials.password, 10);

    // await userModel.findByIdAndUpdate(id, {
    //   name: newCredentials.name,
    //   email: newCredentials.email,
    //   passwordHash,
    // });

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}
