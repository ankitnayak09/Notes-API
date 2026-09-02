export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

type Notes = Record<string, Note>;

type PaginatedNotes = {
  data: Note[];
  meta: {
    page: number;
    limit: number;
    totalPages: number;
  };
};
function generateUUID() {
  return crypto.randomUUID();
}

const notes: Notes = {};

// create
export function createNote(title: string, content: string): Note {
  let id = generateUUID();
  const newNote: Note = {
    title,
    content,
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  notes[id] = newNote;
  return newNote;
}

// get all (paginated)
export function getNotes(page: number = 1, limit: number = 10): PaginatedNotes {
  const allNotes = Object.values(notes);
  const total = allNotes.length;
  const totalPages = Math.ceil(total / limit);
  page = page < totalPages ? page : totalPages;

  const start = (page - 1) * limit;

  return {
    data: allNotes.slice(start, start + limit),
    meta: {
      page,
      limit,
      totalPages,
    },
  };
}

// get by ID
export function getNoteById(id: string): Note | null | undefined {
  if (!Object.hasOwn(notes, id)) {
    return null;
  }

  return notes[id];
}

// update by ID
export function updateNoteById(
  id: string,
  data: { title?: string; content?: string },
): Note | null {
  if (!Object.hasOwn(notes, id)) {
    return null;
  }
  console.log(data);
  const note = notes[id]!;
  const updatedNote = {
    ...note,
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.content !== undefined ? { content: data.content } : {}),
    updatedAt: Date.now(),
  };
  console.log(updatedNote);
  notes[id] = updatedNote;
  return notes[id];
}

// delete by ID
export function deleteNote(id: string) {
  if (!Object.hasOwn(notes, id)) {
    return false;
  }
  delete notes[id];
  return true;
}
