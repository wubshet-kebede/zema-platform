import type { Request, Response, NextFunction } from "express";
import type { LoginInput } from "./login.types.js";
import { loginService } from "./login.service.js";

export const loginController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginService.execute(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
