import { randomBytes, createHmac } from "crypto";
import { sign } from "jsonwebtoken";
import { IUserToken } from "../interfaces/request";

export const random = () => randomBytes(128).toString("base64");

export const createHash = (salt: string, password: string) =>
  createHmac("sha256", [salt, password].join("/"))
    .update(process.env.PASSWORD_SECRET!)
    .digest("hex");

export const generateToken = (input: string) => {
  const user: IUserToken = { id: input };

  return sign(user, process.env.ACCESS_TOKEN_SECRET!);
};

export const checkPassword = (
  salt: string,
  password: string,
  userPassword: string
): boolean => {
  const expectedHash = createHash(salt, password);
  return expectedHash === userPassword;
};

export const validatePassword = (password: string): boolean => {
  return password.length < 8;
};
