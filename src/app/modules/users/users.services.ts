import { IUser } from './users.interface';
import { User } from './users.model';

const createUser = async (data: IUser) => {
  const user = await User.create(data);

  return user;
};
const getAllUsers = async () => {
  const user = await User.find();

  return user;
};

export const usersServices = { createUser, getAllUsers };
