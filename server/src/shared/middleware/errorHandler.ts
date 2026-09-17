import type { ErrorRequestHandler } from "express";

type ErrorWithStatus = Error & {
  statusCode?: number;
  status?: number;
  code?: string;
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const err = error as ErrorWithStatus;

  const statusCode =
    typeof err.statusCode === "number"
      ? err.statusCode
      : typeof err.status === "number"
        ? err.status
        : 500;

  const isOperationalError = statusCode >= 400 && statusCode < 500;

  console.error({
    method: req.method,
    path: req.originalUrl,
    statusCode,
    error: err,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code:
        err.code ?? (isOperationalError ? "REQUEST_ERROR" : "INTERNAL_ERROR"),
      message: isOperationalError
        ? err.message
        : "An unexpected error occurred",
    },
  });
};
