import { type Request, type Response, type NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate =
  (schema: z.ZodType<{ body?: unknown; query?: unknown; params?: unknown }>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsed.body !== undefined) {
        req.body = parsed.body;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join(".").replace(/^body\./, ""),
            message: issue.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
