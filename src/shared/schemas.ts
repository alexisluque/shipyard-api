import { z } from 'zod';

export const requiedStringSchema = (min = 1) =>
  z
    .string({ error: 'Required' })
    .trim()
    .min(min, { error: `Should be >= than ${min}` });
