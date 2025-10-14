import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import userModel from "../../models/userModel.js";
import registerValidation from "../../validation/register.validation.js";
import AppError from "../../errs/appError.js";

export default async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;
    if (!name) throw new AppError("Campo 'name' é obrigatório", 400);
    if (!email) throw new AppError("Campo 'email' é obrigatório", 400);
    if (!password) throw new AppError("Campo 'password' é obrigatório", 400);

    const user = registerValidation.parse({
      name,
      email,
      password,
    });

    const passwordHash: string = await bcrypt.hash(user.password, 10);

    await userModel.create({
      name: user.name,
      email: user.email,
      passwordHash,
    });

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}
