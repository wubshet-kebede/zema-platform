import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { verifyAccessToken } from "../utils/jwt.util.js";
import { AppError } from "../errors/app.error.js";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new AppError(
        "Authentication required",
        401,
        "AUTHENTICATION_REQUIRED",
      );
    }

    const payload = verifyAccessToken(accessToken);

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new AppError("Access token expired", 401, "ACCESS_TOKEN_EXPIRED"),
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new AppError("Invalid access token", 401, "INVALID_ACCESS_TOKEN"),
      );
    }

    return next(error);
  }
};
