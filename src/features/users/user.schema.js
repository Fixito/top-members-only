import { z } from 'zod';

const registerUserSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: "Passwords don't match",
      });
    }
  });

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { loginUserSchema, registerUserSchema };
