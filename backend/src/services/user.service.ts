import User from "../models/user.model";
import { NotFoundError, UnauthorizedError } from "../utils/app-error";

export const findUserByIdService = async (userId: string) => {
  return await User.findById(userId);
};

export const findUsersService = async (userId: string) => {
  const users = await User.find({
    _id: { $ne: userId },
  }).select("-password");
  return users;
};
