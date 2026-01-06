import {z} from 'zod'

export const createNoteSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        content: z.string().min(5)
    })
})

export const updateNoteSchema = z.object({
    body: z.object({
        title: z.string().min(3).optional(),
        content: z.string().min(5).optional()
    })
})