import express from 'express';
import auth from '../../middleware/auth';
import { fileController } from './files.controller';
import { upload } from '../../utils/sendFileToCloudinary';

const router = express.Router();

router.post(
  '/upload/:folderId',
  auth(),
  upload.single('file'),
  fileController.uploadFile,
);

router.get('/', auth(), fileController.getAllFiles);

router.get('/customers', auth(), fileController.getAllFilesByUserId);
router.delete('/:id', auth(), fileController.deleteFile);
router.patch('/:id/rename', auth(), fileController.renameFile);
router.post('/:id/duplicate', auth(), fileController.duplicateFile);
export const fileRoutes = router;
