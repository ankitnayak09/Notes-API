import { Router } from "express";
import noteRouter from "./modules/notes/note.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../config/swagger.js";

const v1Router = Router();

v1Router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

v1Router.use("/notes", noteRouter);

export default v1Router;
