import type { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/utils/apiError.js";
import logger from "./logger.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError && err.isOperational) {
    logger.warn({ err }, err.message);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  logger.error({ err }, "Unexpected Error");
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
}
