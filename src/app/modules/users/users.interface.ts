import { Model } from 'mongoose';

export interface IUser {
  name: string;
  photo?: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
}

export interface UsersModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByCustomId(id: string): Promise<IUser>;
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(plainText: string, hashPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    // eslint-disable-next-line no-unused-vars
    passwordChangeTimestamps: Date,
    // eslint-disable-next-line no-unused-vars
    jwtIssuedTimestamps: number,
  ): Promise<boolean>;
}
