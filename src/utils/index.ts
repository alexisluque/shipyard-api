import * as z from 'zod';

export const validateUUID = (id: string) => {
  const schemaUUID = z.object({ id: z.uuid({ version: 'v4' }) });

  if (z.safeParse(schemaUUID, { id }).success) {
    return true;
  }

  return false;
};
