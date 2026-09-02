import type { Request, Response, NextFunction } from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNoteById,
} from "./note.service.js";
import { asyncHandler } from "../../../../shared/utils/asyncHandler.js";
import { getNoteById } from "../../../../shared/db/notesStore.js";
import logger from "../../../../middlewares/logger.js";

export const getAllNotesHandler = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const { page, limit } = req.query as unknown as {
      page: number;
      limit: number;
    };
    res.json(getNotes(page, limit));
  },
);

export const getNoteByIdHandler = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    // validate the id using zod schema
    const id = req.params.id as unknown as string;
    // if (id < 0 || id > notes.length) {
    //   res.status(404).json({
    //     message: "Invalid Note Id",
    //   });
    // }
    res.json({
      data: getNoteById(id),
    });
  },
);

export const createNoteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;
  const newNote = createNote(title, content);
  res.status(201).json({
    data: newNote,
  });
};

export const updateNoteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as unknown as string;
  const data = req.body;
  res.json({
    data: updateNoteById(id, data),
  });
};

export const deleteNoteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as unknown as string;
  const { success } = deleteNote(id);
  if (success) {
    res.status(204).send();
  }
};
