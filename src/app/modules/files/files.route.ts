import express from 'express';
import auth from '../../middleware/auth';
import { fileController } from './files.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/upload/:folderId',
  auth(),
  upload.single('file'),
  fileController.uploadFile,
);

export const fileRoutes = router;
