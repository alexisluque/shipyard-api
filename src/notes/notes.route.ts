import express, { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { noteParamsSchema, noteSchema } from './notes.schema.js';
import type { AppContext } from '../app/context.js';
import { createNotesController } from './notes.controller.js';

export const createNotesRouter = (ctx: AppContext) => {
  const { getNotes, createNote, updateNote, deleteNote } =
    createNotesController(ctx);

  const router: Router = express.Router();

  router.get('/', authMiddleware, getNotes);
  router.post('/', authMiddleware, validate(noteSchema), createNote);
  router.put(
    '/:id',
    authMiddleware,
    validate(noteSchema),
    validate(noteParamsSchema, 'params'),
    updateNote,
  );
  router.delete(
    '/:id',
    authMiddleware,
    validate(noteParamsSchema, 'params'),
    deleteNote,
  );

  return router;
};
