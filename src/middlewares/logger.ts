import pino from "pino";
import config from "../config/env.js";

const isProd = config.NODE_ENV === "production";
const logger = pino({
  redact: ["req.headers.authorization", "req.body.password"],
  level: isProd ? "info" : "debug",
  ...(!isProd && {
    transport: { target: "pino-pretty", options: { colorize: true } },
  }),
});

export default logger;
