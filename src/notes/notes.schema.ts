import { z } from 'zod';
import { requiedStringSchema } from '../shared/schemas.js';

export const noteSchema = z.object({
  title: requiedStringSchema(),
  content: requiedStringSchema(),
});

export const noteParamsSchema = z.object({
  id: requiedStringSchema(),
});
