import { z } from 'zod';

export const userValidation = {
  createUserSchema: z.object({
    name: z.string().min(1, 'Name is required'),
    photo: z.string().url().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
  updateProfile: z.object({
    name: z.string().optional(),
    photo: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
};
