import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { createNoteSchema, updateNoteSchema } from "./note.schema";
import * as controller from "./note.controller";

const router = Router();

router.post("/", validate(createNoteSchema), controller.createNoteHandler);
router.get("/", controller.getNotesHandler);
router.get("/:id", controller.getNoteHandler);
router.put("/:id", validate(updateNoteSchema), controller.updateNoteHandler);
router.delete("/:id", controller.deleteNoteHandler);

export default router;
