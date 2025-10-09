import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import users from "../../models/userModel.js";

export default async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;
    const hashed: string = await bcrypt.hash(password, 10);

    await users.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "[Ok]>> ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Temos que ver isso ai" });
  }
}
