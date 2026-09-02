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
/**
 * @openapi
 * /notes:
 *    get:
 *      summary: List notes (paginated)
 *      tags: [Notes]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 10
 *      responses:
 *        200:
 *          description: Paginated list of notes
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Note'
 *                      page: {type: integer}
 *                      limit: {type: integer}
 *                      totalPages: {type: integer}
 */
noteRouter.get("/", validate(paginationSchema), getAllNotesHandler);

// Get A Note
/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Note found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: { $ref: '#/components/schemas/Note' }
 *       400:
 *         description: Malformed ID (not a valid UUID)
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
noteRouter.get("/:id", validate(getNoteByIdSchema), getNoteByIdHandler);

// Post a Note
/**
 * @openapi
 * /notes:
 *  post:
 *    summary: Create a Note
 *    tags: [Notes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [title,content]
 *            properties:
 *              title: { type: string,example: "A Day of My Life" }
 *              content: { type: string, example: "The best day of my life was my 16th birthday, a day I will never forget. I consider it the best birthday of my life. All my relatives and friends were present at my birthday party, even my grandmother. She made it extra special for me, cause she's my favourite and I love her the most. She prepared all my favourite food items for the last time. That day became special and meaningful because it was the final one I spent with her before she passed away. I cherished every moment with her, and she also seemed to enjoy herself a lot with me. Hence, my 16th birthday will always hold a special place in my heart and memory as it was the last time I got to spend time with my beloved grandmother." }
 *    responses:
 *      201:
 *        description: Note Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data: { $ref: '#/components/schemas/Note' }
 *      400:
 *        description: Validation error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data: { $ref: '#/components/schemas/Error' }
 */
noteRouter.post("/", validate(createNoteSchema), createNoteHandler);

// Update a Note
/**
 * @openapi
 * /notes/{id}:
 *   patch:
 *     summary: Update a note (partial)
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *           example:
 *             title: "New Content with New Title"
 *             content: "Damn New Content"
 *     responses:
 *       200:
 *         description: Note updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: { $ref: '#/components/schemas/Note' }
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
noteRouter.patch("/:id", validate(updateNoteSchema), updateNoteHandler);

// Delete a Note
/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         example: "6d5c4a79-9d20-4694-aab6-12bbb199b872"
 *     responses:
 *       204:
 *         description: Note deleted (no content)
 *       400:
 *         description: Malformed ID (not a valid UUID)
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
noteRouter.delete("/:id", validate(deleteNoteSchema), deleteNoteHandler);

export default noteRouter;
