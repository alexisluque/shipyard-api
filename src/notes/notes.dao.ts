import type { DataSource } from 'typeorm';
import type { User } from '../auth/users.entity.js';
import { NotFoundError } from '../error/error.js';
import { Note } from './notes.entity.js';

export const CreatenotesDao = (db: DataSource) => {
  const noteRepository = db.getRepository(Note);

  return {
    getNotesByUser: async (userId: string) => {
      const notes = await noteRepository.find({
        where: { user: { id: userId } },
        order: { created_at: 'DESC' },
      });

      return notes;
    },
    createNote: async (userId: string, title: string, content: string) => {
      const note = new Note();

      note.title = title;
      note.content = content;
      note.user = { id: userId } as User;

      return await noteRepository.save(note);
    },
    updateNote: async (
      noteId: string,
      userId: string,
      title: string,
      content: string,
    ) => {
      const note = await noteRepository.findOneBy({
        id: noteId,
        user: { id: userId },
      });

      if (!note) {
        throw new NotFoundError('Note not found');
      }

      note.title = title;
      note.content = content;

      return await noteRepository.save(note);
    },
    deleteNote: async (noteId: string, userId: string) => {
      return await noteRepository.delete({ id: noteId, user: { id: userId } });
    },
  };
};
