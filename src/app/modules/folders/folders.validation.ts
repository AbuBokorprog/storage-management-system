import { z } from 'zod';

export const folderValidation = {
  createFolderSchema: z.object({
    name: z.string().min(1, 'Name is required'),
  }),
};
