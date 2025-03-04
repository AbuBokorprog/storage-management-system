import express from 'express';
import { foldersController } from './folders.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../utils/validateRequest';
import { folderValidation } from './folders.validation';

const router = express.Router();

router.post(
  '/create',
  auth(),
  validateRequest(folderValidation.createFolderSchema),
  foldersController.createFolder,
);
router.get('/', auth(), foldersController.getFolders);
router.delete('/:id', auth(), foldersController.deleteFolder);
router.patch('/:id/rename', auth(), foldersController.renameFolder);
router.post('/:id/duplicate', auth(), foldersController.duplicateFolder);

export const foldersRoutes = router;
