import { InternalServerError } from "./app-error";
import bcrypt from "bcrypt";

export const hashValue = async (
  val: string,
  salt: number = 10
): Promise<string> => {
  try {
    return await bcrypt.hash(val, salt);
  } catch (error) {
    throw new InternalServerError("Cannot hash the password!");
  }
};

export const compareValue = async (
  val: string,
  hashedVal: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(val, hashedVal);
  } catch (error) {
    throw new InternalServerError("Cannot compare the hash!");
  }
};
