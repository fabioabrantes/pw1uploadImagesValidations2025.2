import type { Request, Response, NextFunction } from "express";
import { AppErrosCustom } from "../errors/errorsAplications.ts";
import { AppErrorsZod } from "../errors/errorsZod.ts";

function tratadorErros(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppErrosCustom) {
    response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof AppErrorsZod) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  response.status(500).json({
    status: error,
    message: "Internal error on server or database",
  });
}

export { tratadorErros };
