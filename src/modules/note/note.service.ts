import { Note } from "./note.types";
import { randomUUID } from "crypto";

const notes: Note[] = [];

export const createNote = (title: string, content: string) => {
  const now = new Date();

  const note: Note = {
    id: randomUUID(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };

  notes.push(note);
  return note;
};

export const getPaginatedNotes = (page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: notes.slice(start, end),
    total: notes.length,
    page,
    limit,
  };
};

export const getNoteById = (id: string): Note | undefined =>
  notes.find((note) => note.id === id);

export const updateNote = (
  id: string,
  data: Partial<Pick<Note, "title" | "content">>
): Note | null => {
  const note = notes.find((note) => note.id === id);

  if (!note) return null;

  Object.assign(note, data, { updatedAt: new Date() });
  return note;
};

export const deleteNote = (id: string): boolean => {
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return false;

  notes.splice(index, 1);
  return true;
};
