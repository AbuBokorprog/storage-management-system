import { z } from 'zod';

export const authValidation = {
  registerSchema: z.object({
    name: z.string().min(1, 'Name is required'),
    photo: z.string().url().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
  loginSchema: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password is required'),
  }),
  forgetPasswordSchema: z.object({
    email: z.string().email('Invalid email address'),
  }),
  resetPasswordSchema: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
  changePasswordSchema: z.object({
    oldPassword: z.string().min(6, 'Old password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters long'),
  }),
};
