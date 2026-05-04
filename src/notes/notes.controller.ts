import type { Request, Response } from 'express';
import { NotFoundError } from '../error/error.js';
import { validateUUID } from '../utils/index.js';
import type { AppContext } from '../app/context.js';
import { CreatenotesDao } from './notes.dao.js';

export const createNotesController = (ctx: AppContext) => {
  const { getNotesByUser, createNote, deleteNote, updateNote } = CreatenotesDao(
    ctx.db,
  );

  return {
    getNotes: async (req: Request, res: Response) => {
      const notes = await getNotesByUser(req.userId!);

      res.json(notes);
    },
    createNote: async (req: Request, res: Response) => {
      const { title, content } = req.body;

      const note = await createNote(req.userId!, title, content);

      res.status(201).json(note);
    },
    updateNote: async (req: Request, res: Response) => {
      const { id } = req.params;
      const { title, content } = req.body;

      if (!validateUUID(id as string)) {
        throw new NotFoundError('Note not found');
      }

      const note = await updateNote(id as string, req.userId!, title, content);

      if (!note) {
        throw new NotFoundError('Note not found');
      }

      res.json(note);
    },
    deleteNote: async (req: Request, res: Response) => {
      const { id } = req.params as { id: string };

      if (!validateUUID(id)) {
        throw new NotFoundError('Note not found');
      }

      const note = await deleteNote(id as string, req.userId!);

      if (!note) {
        throw new NotFoundError('Note not found');
      }

      res.status(204).send();
    },
  };
};
