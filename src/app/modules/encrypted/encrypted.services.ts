import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import bcrypt from 'bcrypt';
import { User } from '../users/users.model';
import { File } from '../files/files.model';
import { Folder } from '../folders/folders.model';

const setEncryptedPin = async (userId: string, pin: string) => {
  const isExistUser = await User.findById(userId);

  if (!isExistUser)
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');

  if (!pin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'PIN is required');
  }

  const hashedPin = await bcrypt.hash(pin, 10);
  const user = await User.findByIdAndUpdate(
    userId,
    {
      encryptedPin: hashedPin,
    },
    { new: true, runValidators: true },
  );

  return user;
};

const getEncryptedFilesAndFolders = async (userId: string, pin: string) => {
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  if (!pin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'PIN is required');
  }

  const isMatch = await bcrypt.compare(pin, isExistUser.encryptedPin as string);
  if (!isMatch) throw new AppError(httpStatus.BAD_REQUEST, "Invalid PIN'");

  const files = await File.find({ userId, isEncrypted: true });
  const folders = await Folder.find({ userId, isEncrypted: true });

  return { files, folders };
};

const encryptedPinRemove = async (userId: string, pin: string) => {
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
  }

  const isMatch = await bcrypt.compare(pin, isExistUser.encryptedPin as string);
  if (!isMatch) throw new AppError(httpStatus.BAD_REQUEST, "Invalid PIN'");

  await User.findByIdAndUpdate(userId, { encryptedPin: null });

  await File.updateMany(
    { userId, isEncrypted: true },
    {
      isEncrypted: false,
    },
  );

  await Folder.updateMany(
    { userId, isEncrypted: true },
    {
      isEncrypted: false,
    },
  );

  return isExistUser;
};

const toggleFileEncrypt = async (
  userId: string,
  pin: string,
  fileId: string,
) => {
  const user = await User.findById(userId);
  if (!user?.encryptedPin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No encrypted PIN set');
  }

  const isMatch = await bcrypt.compare(pin, user.encryptedPin);
  if (!isMatch) throw new AppError(httpStatus.BAD_REQUEST, "Invalid PIN'");

  const isFileEncrypted = await File.findById(fileId);

  if (isFileEncrypted?.isEncrypted) {
    await File.findByIdAndUpdate(fileId, {
      isEncrypted: false,
    });
  } else {
    await File.findByIdAndUpdate(fileId, {
      isEncrypted: true,
    });
  }
};

const toggleFolderEncrypt = async (
  userId: string,
  pin: string,
  folderId: string,
) => {
  const user = await User.findById(userId);
  if (!user?.encryptedPin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No encrypted PIN set');
  }

  const isMatch = await bcrypt.compare(pin, user.encryptedPin);
  if (!isMatch) throw new AppError(httpStatus.BAD_REQUEST, "Invalid PIN'");

  const isFolderEncrypted = await Folder.findById(folderId);

  if (isFolderEncrypted?.isEncrypted) {
    await Folder.findByIdAndUpdate(folderId, {
      isEncrypted: false,
    });
  } else {
    await Folder.findByIdAndUpdate(folderId, {
      isEncrypted: true,
    });
  }
};

export const encryptedServices = {
  setEncryptedPin,
  getEncryptedFilesAndFolders,
  encryptedPinRemove,
  toggleFileEncrypt,
  toggleFolderEncrypt,
};
