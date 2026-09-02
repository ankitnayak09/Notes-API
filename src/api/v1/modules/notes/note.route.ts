import { Router } from "express";
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
} from "./note.controller.js";
import { validate } from "../../../../middlewares/validate.middleware.js";
import {
  createNoteSchema,
  deleteNoteSchema,
  getNoteByIdSchema,
  paginationSchema,
  updateNoteSchema,
} from "./note.schema.js";

const noteRouter = Router();

// Get All Notes
noteRouter.get("/", validate(paginationSchema), getAllNotesHandler);

// Get A Note
noteRouter.get("/:id", validate(getNoteByIdSchema), getNoteByIdHandler);

// Post a Note
noteRouter.post("/", validate(createNoteSchema), createNoteHandler);

// Update a Note
noteRouter.patch("/:id", validate(updateNoteSchema), updateNoteHandler);

// Delete a Note
noteRouter.delete("/:id", validate(deleteNoteSchema), deleteNoteHandler);

export default noteRouter;
