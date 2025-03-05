import express from 'express';
import auth from '../../middleware/auth';
import { favoriteController } from './favorite.controller';

const router = express.Router();

router.post('/file/:fileId', auth(), favoriteController.toggleFavoriteFile);
router.post(
  '/folder/:folderId',
  auth(),
  favoriteController.toggleFavoriteFolder,
);

router.get('/', auth(), favoriteController.getAllFavoriteFilesAndFolders);

export const favoriteRoutes = router;
