import type { Request, Response, NextFunction } from "express";
import userModel from "../../models/users/userModel.js";
import AppError from "../../server/errs/appError.js";
import { createUserSchema } from "../../models/users/userValidation.js";
import bcrypt from "bcryptjs";
import type { userReq } from "../../interface/iUser.js";

export default async function updateUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = (req as userReq).user;

    const { name, email, password } = req.body;
    if (!name) throw new AppError("name ausente", 400);
    if (!email) throw new AppError("email ausente", 400);
    if (!password) throw new AppError("password ausente", 400);

    const newCredentials = createUserSchema.parse({
      name,
      email,
      password,
    });

    const passwordHash = await bcrypt.hash(newCredentials.password, 10);

    const newUser = await userModel.findByIdAndUpdate(
      id,
      {
        name: newCredentials.name,
        email: newCredentials.email,
        passwordHash,
      },
      { new: true }
    );
    if (!newUser) throw new AppError("Usuário não existe", 400);

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}
