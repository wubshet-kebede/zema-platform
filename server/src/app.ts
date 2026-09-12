import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

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

// 3. TODO: Feature Routes will be mounted here
// app.use('/api/songs', songRouter);
// app.use('/api/stats', statsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
