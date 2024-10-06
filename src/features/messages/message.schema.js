import { z } from 'zod';

const messageSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export { messageSchema };
