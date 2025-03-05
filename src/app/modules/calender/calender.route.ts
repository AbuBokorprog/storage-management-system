import express from 'express';
import auth from '../../middleware/auth';
import { calenderController } from './calender.controller';
const router = express.Router();

router.get('/', auth(), calenderController.getAllFilesAndFolders);

export const calenderRoutes = router;
