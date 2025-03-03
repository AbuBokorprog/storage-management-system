import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
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
  if (file) {
    const response: any = await sendImageToCloudinary(
      file?.originalname,
      file.path,
    );
    const secureUrl = response.secureUrl as string;

    payload.photo = secureUrl || file?.path;
  }

  const user = await User.findByIdAndUpdate(userId, { payload });

  return user;
};

export const usersServices = { getAllUsers, getMe, updateMe };
