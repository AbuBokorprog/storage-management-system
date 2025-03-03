import express from 'express';
import { userValidation } from './users.validation';
import validateRequest from '../../utils/validateRequest';
import { usersController } from './users.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(userValidation.createUserSchema),
  usersController.createUser,
);

router.get('/', usersController.getAllUsers);

export const UserRoutes = router;
