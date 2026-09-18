import type { Request, Response, NextFunction } from "express";
import { meService } from "./me.service.js";
export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return next(new Error("User ID missing from authenticated request"));
    }

    const user = await meService.execute(userId);

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
