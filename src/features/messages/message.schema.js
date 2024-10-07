import { z } from 'zod';

const messageSchema = z.object({
  title: z.string().refine((val) => val.trim() !== '', {
    message: 'Cannot be empty',
  }),
  message: z.string().refine((val) => val.trim() !== '', {
    message: 'Cannot be empty',
  }),
});

export { messageSchema };
