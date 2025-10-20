import type { Request, Response, NextFunction } from "express";
import loginValidation from "../../validation/userValidation/login.validation.js";
import userModel from "../../models/users/userModel.js";
import AppError from "../../errs/appError.js";
import env from "../../config/env.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email) throw new AppError("Campo 'Email' é obrigatório", 400);
    if (!password) throw new AppError("Campo 'Senha' é obrigatório", 400);

    const user = loginValidation.parse({ email, password });

    const _user = await userModel.findOne({ email: user.email });
    if (!_user) throw new AppError("Usuario não encontrado", 400);

    const validatingHash: boolean = await bcrypt.compare(
      user.password,
      _user.passwordHash
    );
    if (!validatingHash) throw new AppError("Credenciais inválidas", 400);

    const userId = _user._id;

    const token = jwt.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}
