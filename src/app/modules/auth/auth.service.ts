import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../users/users.model';
import httpStatus from 'http-status';
import crypto from 'crypto';
import { AppError } from '../../errors/AppError';
import { sendEmail } from '../../utils/sendMail';
import { IUser } from '../users/users.interface';
import config from '../../config';

// Register
const register = async (data: IUser) => {
  // check is user already exist?
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'Email already exists');
  }
  // hashing password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    email: data.email,
    name: data.name,
    photo: data.photo,
    password: hashedPassword,
  });

  console.log(data);

  return user;
};

// login password
const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  const access_token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    config.api_secret_key as string,
    {
      expiresIn: '1d',
    },
  );

  const refresh_token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    config.jwt_refresh_secret as string,
    {
      expiresIn: '1d',
    },
  );

  return {
    user,
    access_token,
    refresh_token,
  };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail(
    user.email,
    'Password Reset',
    `Reset your password using this link: ${resetUrl}`,
  );
};

const resetPassword = async (token: string, newPassword: string) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid or expired token');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect old password');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};

export const authService = {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
};
