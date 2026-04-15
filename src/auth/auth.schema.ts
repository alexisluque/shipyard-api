import { z } from 'zod';
import { requiedStringSchema } from '../shared/schemas.js';

export const loginSchema = z.object({
  email: z.string({ error: 'Required' }).pipe(z.email({ error: 'Invalid email' })),
  password: requiedStringSchema(8),
});

export type LoginType = z.infer<typeof loginSchema>;
