import express, { Router } from 'express';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from './notes.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { noteParamsSchema, noteSchema } from './notes.schema.js';

const router: Router = express.Router();

router.get('/', authMiddleware, getNotes);
router.post('/', authMiddleware, validate(noteSchema), createNote);
router.put('/:id', authMiddleware, validate(noteSchema), validate(noteParamsSchema, 'params'), updateNote);
router.delete('/:id', authMiddleware, validate(noteParamsSchema, 'params'), deleteNote);

export default router;
