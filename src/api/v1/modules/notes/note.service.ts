import {
  getNotes as getNotesFromStore,
  createNote as createNoteInStore,
  getNoteById as getNoteByIdFromStore,
  updateNoteById as updateNoteByIdInStore,
  deleteNote as deleteNoteFromStore,
} from "../../../../shared/db/notesStore.js";
import { NotFoundError } from "../../../../shared/utils/apiError.js";
import type { Note } from "../../../../shared/db/notesStore.js";
import { success } from "zod";
import logger from "../../../../middlewares/logger.js";

export function createNote(title: string, content: string) {
  // sanitize content or enfore a per user note limit
  return createNoteInStore(title, content);
}

export function getNotes(page: number, limit: number) {
  // soft-deletes or visibility rules ("only return notes not archived")
  return getNotesFromStore(page, limit);
}

export function getNoteById(id: string) {
  const note = getNoteByIdFromStore(id);

  // service actual job: translating no data into a meaningful domain error.
  if (!note) {
    throw new NotFoundError(`Note with id ${id} not found`);
  }

  return note;
}

export function updateNoteById(
  id: string,
  data: { title?: string; content?: string },
): Note | null {
  const payload: { title?: string; content?: string } = {};

  const { title, content } = data;
  if (title !== undefined) payload.title = title;
  if (content !== undefined) payload.content = content;

  const updated = updateNoteByIdInStore(id, payload);
  console.log(payload);

  if (!updated) {
    throw new NotFoundError(`Note with id ${id} not found`);
  }

  return updated;
}

export function deleteNote(id: string) {
  const deleted = deleteNoteFromStore(id);

  if (!deleted) {
    throw new NotFoundError(`Note with id ${id} not found`);
  }

  return { success: true };
}
