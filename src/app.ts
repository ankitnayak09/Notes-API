import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import { pinoHttp } from "pino-http";
import logger from "./middlewares/logger.js";
import helmet from "helmet";
import apiRouter from "./api/index.js";
import { NotFoundError } from "./shared/utils/apiError.js";

function createApp() {
  const app = express();

  app.use(
    pinoHttp({
      logger,
      genReqId: (req) =>
        (req.headers["x-request-id"] as string) ?? crypto.randomUUID(), // trace the whole path of the request
    }),
  );
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json());

  // Health Route
  app.get("/api/health", (req, res) => {
    res.json({ uptime: process.uptime(), healthy: true });
  });

  // Note Routes
  app.use("/api", apiRouter);

  // 404 for unmatched routes
  app.use((req, res, next) => {
    next(new NotFoundError("Route Not Found"));
  });

  // Error Middleware
  app.use(errorHandler);

  return app;
}

export default createApp;
