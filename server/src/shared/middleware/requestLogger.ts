import type { RequestHandler } from "express";
import crypto from "node:crypto";

export const requestLogger: RequestHandler = (req, res, next) => {
  const requestId = req.header("x-request-id") ?? crypto.randomUUID();
  const startedAt = process.hrtime.bigint();

  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    console.info({
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
    });
  });

  next();
};
