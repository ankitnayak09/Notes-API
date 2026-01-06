import { Request, Response } from "express";
import * as noteService from "./note.service";
import { apiResponse } from "../../utils/apiResponse";

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
  if (!id)
    return res
      .status(400)
      .json({ message: "Please send Note Id in Parameters" });

  const note = noteService.getNoteById(id);

  if (!note) return res.status(404).json({ message: "Note not Found" });

  res.json(apiResponse(note));
};

export const updateNoteHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .json({ message: "Please send Note Id in Parameters" });

  const note = noteService.updateNote(id, req.body);

  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(apiResponse(note));
};

export const deleteNoteHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .json({ message: "Please send Note Id in Parameters" });
  const deleted = noteService.deleteNote(id);
  if (!deleted) return res.status(404).json({ message: "Note Not Found" });
  res.status(204).send();
};
