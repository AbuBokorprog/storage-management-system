import { z } from 'zod';

export const folderValidation = {
  createFolderSchema: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      userId: z.string({ message: 'User id is required!' }),
    }),
  }),
};
