import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";

type JwtPayload = {
  email: String;
};

export default async function profileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth: string | undefined = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Token ausente" });

    const token: string = auth.split(" ")[1] as string;

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    res.json({ message: `Bem-vindo, ${decoded.email}` });
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
