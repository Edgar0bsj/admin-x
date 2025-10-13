import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import users from "../../models/userModel.js";
import registerUser from "../../validation/registerUser.js";
import z from "zod";

export default async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;

    const _user = registerUser.parse({ name, email, password });

    const hashed: string = await bcrypt.hash(_user.password, 10);

    await users.create({
      name: _user.name,
      email: _user.email,
      password: hashed,
    });

    res.status(201).end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const msg = error.issues.map((element) => {
        return element.message;
      });
      res.status(400).json(msg);
    }
    res.status(400).json({ message: "Email já existe" });
  }
}
