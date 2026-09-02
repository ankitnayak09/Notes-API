import { Router } from "express";
import noteRouter from "./modules/notes/note.route.js";

const v1Router = Router();

v1Router.use("/notes", noteRouter);

export default v1Router;
