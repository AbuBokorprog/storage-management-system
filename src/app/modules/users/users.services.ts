import { sendFileToCloudinary } from '../../utils/sendFileToCloudinary';
import { IUser } from './users.interface';
import { User } from './users.model';

const getAllUsers = async () => {
  const user = await User.find();

  return user;
};

const getMe = async (userid: string) => {
  const user = await User.findById(userid);

  return user;
};

const updateMe = async (userId: string, payload: Partial<IUser>, file: any) => {
  let photo = null;
  if (file) {
    const response: any = await sendFileToCloudinary(
      file?.originalname,
      file.path,
    );
    const secureUrl = response.secure_url as string;

    photo = secureUrl || file?.path;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { ...payload, photo: photo },
    { new: true, runValidators: true },
  );

  return user;
};

export const usersServices = { getAllUsers, getMe, updateMe };
