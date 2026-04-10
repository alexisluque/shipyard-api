import type { Request, Response } from 'express';
import {
  createNote as createNoteDao,
  getNotesByUser,
  updateNote as updateNoteDao,
  deleteNote as deleteNoteDao,
} from './notes.dao.js';
import { NotFoundError, ValidationError } from '../error/error.js';

export const getNotes = async (req: Request, res: Response) => {
  const notes = await getNotesByUser(req.userId!);

  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title) {
    throw new ValidationError('Title is required');
  }

  const note = await createNoteDao(req.userId!, title, content);

  res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title) {
    throw new ValidationError('Title is required');
  }

  const note = await updateNoteDao(id as string, req.userId!, title, content);

  if (!note) {
    throw new NotFoundError('Note not found');
  }

  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await deleteNoteDao(id as string, req.userId!);

  if (!note) {
    throw new NotFoundError('Note not found');
  }

  res.status(204).send();
};
