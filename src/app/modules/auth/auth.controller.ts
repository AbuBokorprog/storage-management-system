import catchAsync from '../../utils/catchAsync';
import successResponse from '../../utils/successRespon';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import { Request, Response } from 'express';
import config from '../../config';

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully!',
    data: user,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const data = await authService.login(email, password);

  res.cookie('refreshToken', data.refresh_token, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully!',
    data,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  await authService.forgetPassword(req.body.email);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset link sent to your email!',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset successfully!',
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    await authService.changePassword(
      user.id,
      req.body.oldPassword,
      req.body.newPassword,
    );
    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully!',
    });
  },
);

export const authController = {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
};
