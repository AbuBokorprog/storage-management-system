import { Schema, model } from 'mongoose';
import { IUser, UsersModel } from './users.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    photo: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
    storageUsed: {
      type: Number,
      default: 0,
    },
    maxStorage: {
      type: Number,
      default: 15 * 1024 * 1024 * 1024,
    },
    encryptedPin: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ _id: id });
};

UserSchema.statics.isPasswordMatched = async function (
  plainText,
  hashPassword,
) {
  return bcrypt.compare(plainText, hashPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangeTimestamps: Date,
  jwtIssuedTimestamps: number,
) {
  const passwordChangedTime =
    new Date(passwordChangeTimestamps).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamps;
};

export const User = model<IUser, UsersModel>('User', UserSchema);
