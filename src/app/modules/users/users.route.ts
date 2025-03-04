import express, { NextFunction, Request, Response } from 'express';

import { usersController } from './users.controller';
import auth from '../../middleware/auth';
import { upload } from '../../utils/sendFileToCloudinary';
import validateRequest from '../../utils/validateRequest';
import { userValidation } from './users.validation';

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.get('/me', auth(), usersController.getMe);

router.patch(
  '/update-profile',
  upload.single('image'),
  auth(),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req?.body?.data);
    next();
  },
  validateRequest(userValidation.updateProfile),
  usersController.updateMyProfile,
);

export const UserRoutes = router;
