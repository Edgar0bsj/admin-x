import type { Request, Response, NextFunction } from "express";
import z from "zod";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erro de validação
  if (err instanceof z.ZodError) {
    const msg = err.issues.map((element) => {
      return element.message;
    });

    res.status(401).json({
      success: false,
      error: {
        message: msg,
        statusCode: 401,
      },
    });
  }
  // Erros Genéricos
  console.error(`[ERROR]>> ${err.message || err}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno do servidor";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
}
