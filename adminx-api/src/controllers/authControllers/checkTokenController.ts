import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";

type JwtPayload = jwt.JwtPayload & {
  email: String;
};
type Header = string | undefined;

export default async function checkTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization as Header;
    if (!auth) return res.status(401).json({ message: "Token ausente" });

    const token = auth.split(" ")[1] as string;

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    res.json({ message: `Bem-vindo, ${decoded.email}` });
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
