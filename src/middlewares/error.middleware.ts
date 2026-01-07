import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  logger.error(`Unhandled Error: ${err}`);
  // console.log("Unhandled Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
