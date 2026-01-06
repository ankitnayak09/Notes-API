import { Request, Response } from "express";
import * as noteService from "./note.service";
import { apiResponse } from "../../utils/apiResponse";
import { ApiError } from "utils/apiError";

export const createNoteHandler = (req: Request, res: Response) => {
  const { title, content } = req.body;
  const note = noteService.createNote(title, content);
  res.status(201).json(apiResponse(note, "Note Created"));
};

export const getNotesHandler = (_: Request, res: Response) => {
  res.json(apiResponse(noteService.getAllNotes()));
};

export const getNoteHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Please send Note Id in Parameters");

  const note = noteService.getNoteById(id);

  if (!note) throw new ApiError(404, "Note not Found");

  res.json(apiResponse(note));
};

export const updateNoteHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Please send Note Id in Parameters");

  const note = noteService.updateNote(id, req.body);

  if (!note) throw new ApiError(404, "Note not Found");
  res.json(apiResponse(note));
};

export const deleteNoteHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Please send Note Id in Parameters");
  const deleted = noteService.deleteNote(id);
  if (!deleted) throw new ApiError(404, "Note not Found");
  res.status(204).send();
};
