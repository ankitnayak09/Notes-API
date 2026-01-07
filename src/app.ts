import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import { notFound } from "./middlewares/notFound.middleware";
import healthRouter from "./routes/health.route";
import noteRouter from "./modules/note/note.route";
import { requestLogger } from "./middlewares/logger.middleware";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use("/health", healthRouter);
app.use("/api/v1/note", noteRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
