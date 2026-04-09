import express, { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote } from './notes.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router: Router = express.Router();

router.get('/', getNotes);
router.post('/', authMiddleware, createNote);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;
