import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { requestLogger } from "./shared/middleware/requestLogger.js";
import { notFoundHandler } from "./shared/middleware/notFoundHandler.js";
import { errorHandler } from "./shared/middleware/errorHandler.js";
import routes from "./routes/index.js";
const app: Express = express();
const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  }),
);
app.use(express.json());
app.use(requestLogger);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
// checking the service health
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: "zema-api",
      status: "healthy",
    },
  });
});
// routes
app.use("/api/v1", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
