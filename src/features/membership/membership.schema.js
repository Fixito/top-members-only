import { z } from 'zod';

const MembershipPasswordSchema = z.object({
  secretPassword: z.string(),
});

export { MembershipPasswordSchema };
