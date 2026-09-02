import createApp from "./app.js";
import config from "./config/env.js";
import logger from "./middlewares/logger.js";

const app = createApp();

app.listen(config.PORT, () =>
  logger.info("Server is listening on : http://localhost:" + config.PORT),
);

// Uncaught exceptions — sync code, outside Express's request cycle
process.on("uncaughtException", (err) => {
  logger.fatal(`UNCAUGHT EXCEPTION — shutting down ${err}`);
  process.exit(1); // don't try to keep running after this
});

// Unhandled promise rejections — e.g. a floating promise nobody awaited
process.on("unhandledRejection", (reason) => {
  logger.fatal(`UNHANDLED REJECTION, ${reason}`);
  process.exit(1);
});
