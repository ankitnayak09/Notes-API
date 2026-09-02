import * as z from "zod";
export const createNoteSchema = z.object({
  body: z.object({
    title: z.string("Please input a Title").trim().min(1).max(120),
    content: z.string("Please input a Content").trim().min(1).max(2048),
  }),
});

export const getNoteByIdSchema = z.object({
  params: z.object({
    id: z.uuid("Missing ID"),
  }),
});

export const updateNoteSchema = z.object({
  body: z
    .object({
      title: z.string("Please input a Title").trim().min(1).max(120).optional(),
      content: z
        .string("Please input a Content")
        .trim()
        .min(1)
        .max(2048)
        .optional(),
    })
    .strict()
    .refine((body) => body.title !== undefined || body.content !== undefined, {
      message: "At least one of title or content is required",
    }),
  params: z.object({
    id: z.uuid("Missing UUID"),
  }),
});

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).default(10),
  }),
});

export const deleteNoteSchema = z.object({
  params: z.object({
    id: z.uuid("Missing UUID"),
  }),
});
