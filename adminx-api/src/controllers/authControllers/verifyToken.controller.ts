import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import AppError from "../../errs/appError.js";

type JwtPayload = jwt.JwtPayload & {
  email: String;
};
type Header = string | undefined;

type RequestUser = Request & {
  user: object;
};

export default async function verifyTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization as Header;
    if (!auth) throw new AppError("Token ausente", 401);

    const token = auth.split(" ")[1] as string;

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    if (!auth) throw new AppError("Token inválido ou expirado", 401);

    (req as RequestUser).user = decoded;

    console.log("[Verificação do token]>> verificado");
    next();
  } catch (err) {
    next(err);
  }
}
