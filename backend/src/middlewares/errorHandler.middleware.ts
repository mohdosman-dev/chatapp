import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError, ErrorCodes } from "../utils/app-error";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`errorHandler: ${req.path}`, error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error instanceof ZodError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      error: "Validation failed",
      details: error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error",
    error: error?.message || "Something went wrong!",
    errorCode: ErrorCodes.ERR_INTERNAL,
  });
};
