import type { Request, Response, NextFunction } from "express";
import type { SignupInput } from "./signup.types.js";
import { signupService } from "./signup.service.js";

export const signupController = async (
  req: Request<{}, {}, SignupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await signupService.execute(req.body);

    res.status(200).json({
      success: true,
      message: "Signup successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
