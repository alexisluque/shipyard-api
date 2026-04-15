import { query } from '../db/index.js';

export const getNotesByUser = async (userId: string) => {
  const result = await query(
    'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
    [userId],
  );

  return result.rows;
};

export const createNote = async (
  userId: string,
  title: string,
  content: string,
) => {
  const { rows } = await query(
    `INSERT INTO notes (user_id, title, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, content],
  );

  return rows[0];
};

export const updateNote = async (
  noteId: string,
  userId: string,
  title: string,
  content: string,
) => {
  const result = await query(
    `UPDATE notes
     SET title = $1, content = $2
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title, content, noteId, userId],
  );

  return result.rows[0];
};

export const deleteNote = async (noteId: string, userId: string) => {
  const { rows } = await query(
    `DELETE FROM notes
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [noteId, userId],
  );

  return rows[0];
};
