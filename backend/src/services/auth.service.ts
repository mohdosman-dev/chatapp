import User from "../models/user.model";
import { BadRequestError, UnauthorizedError } from "../utils/app-error";
import { saveAvatar } from "../utils/file.utils";
import { LoginSchema, RegisterSchema } from "../validators/auth.validator";

export const registerService = async (body: RegisterSchema) => {
  const { email } = body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new BadRequestError("User already exisits!");
  }

  // Save avatar if provided
  if (body.avatar) {
    const avatarPath = await saveAvatar(body.avatar, email);
    body.avatar = avatarPath;
  }

  const newUser = new User({
    ...body,
  });
  await newUser.save();
  return newUser;
};

export const loginService = async (body: LoginSchema) => {
  const { email, password } = body;
  console.log("Login body", body);

  const user = await User.findOne({ email: email });
  console.log("User", user);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password!");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid)
    throw new UnauthorizedError("Invalid email or password!");

  return user;
};
