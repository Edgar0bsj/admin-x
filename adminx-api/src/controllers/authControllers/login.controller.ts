import type { Request, Response, NextFunction } from "express";
import { loginSchema } from "../../models/users/userValidation.js";
import type { LoginInput } from "../../models/users/userValidation.js";
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

    const user: LoginInput = loginSchema.parse({
      email,
      passwordHash: password,
    });

    const user_Db = await userModel.findOne({ email: user.email });
    if (!user_Db) throw new AppError("Usuario não encontrado", 400);

    const verifyHash: boolean = await bcrypt.compare(
      user.passwordHash,
      user_Db.passwordHash
    );
    if (!verifyHash) throw new AppError("Credenciais inválidas", 400);

    const userId = user_Db._id;

    const token = jwt.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}
