import express from 'express';
import { authValidation } from './auth.validation';
import validateRequest from '../../utils/validateRequest';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';
// import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidation.registerSchema),
  authController.register,
);

router.post(
  '/login',
  validateRequest(authValidation.loginSchema),
  authController.login,
);

router.post(
  '/forget-password',
  validateRequest(authValidation.forgetPasswordSchema),
  authController.forgetPassword,
);

router.post(
  '/reset-password/:token',
  validateRequest(authValidation.resetPasswordSchema),
  authController.resetPassword,
);

router.patch(
  '/change-password',
  auth(),
  validateRequest(authValidation.changePasswordSchema),
  authController.changePassword,
);

export const AuthRoutes = router;
