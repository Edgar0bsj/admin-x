/*
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import users from "../../models/userModel.js";
import env from "../../config/env.js";

export default async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const [_user, ..._] = await users.find({ email });

    if (!_user)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const ComparePassword: boolean = await bcrypt.compare(
      password,
      _user.password
    );

    if (!ComparePassword)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const token = jwt.sign({ email }, env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).end();
  }
}
*/
