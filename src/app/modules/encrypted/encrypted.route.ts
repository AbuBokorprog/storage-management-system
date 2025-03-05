import express from 'express';
import auth from '../../middleware/auth';
import { encryptedController } from './encrypted.controller';

const router = express.Router();

// set encrypted pin
router.post('/set', auth(), encryptedController.setEncryptedPin);
// get all encrypted files and folders
router.post(
  '/get-all',
  auth(),
  encryptedController.getEncryptedFilesAndFolders,
);
// remove encrypted pin
router.post('/remove', auth(), encryptedController.encryptedPinRemove);
// file encrypted
router.post('/file/:fileId', auth(), encryptedController.toggleFileEncrypt);
// folder encrypted
router.post(
  '/folder/:folderId',
  auth(),
  encryptedController.toggleFolderEncrypt,
);
export const encryptedRoutes = router;
