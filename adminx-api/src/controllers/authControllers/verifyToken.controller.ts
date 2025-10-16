import type { Request, Response, NextFunction } from "express";
import type { iUserReq, iUserPayload } from "../../interface/iUser.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import AppError from "../../errs/appError.js";

export default async function verifyTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new AppError("Token ausente", 401);

    const token = auth.split(" ")[1] as string;

    const decoded = jwt.verify(token, env.JWT_SECRET) as iUserPayload;
    if (!auth) throw new AppError("Token inválido ou expirado", 401);

    (req as iUserReq).user = decoded;

    console.log("[Verificação do token]>> verificado");

    next();
  } catch (err) {
    next(err);
  }
}
