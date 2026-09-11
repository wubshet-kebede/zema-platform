import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";

const app: Express = express();

// 1. Core Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads into req.body

// 2. Health Check Route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Zema API is healthy" });
});

// 3. TODO: Feature Routes will be mounted here
// app.use('/api/songs', songRouter);
// app.use('/api/stats', statsRouter);

// 4. Global 404 Handler (Unmatched routes)
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

// 5. Centralized Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled Application Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
