import { randomBytes, createHmac } from "crypto";
import { sign } from "jsonwebtoken";
import { IUserToken } from "../interfaces/request";

export const random = () => randomBytes(128).toString("base64");

export const createHash = (salt: string, password: string) =>
  createHmac("sha256", [salt, password].join("/"))
    .update(process.env.PASSWORD_SECRET!)
    .digest("hex");

export const generateJwtToken = (id: string) => {
  const identity: IUserToken = { id };
  return sign(identity, process.env.ACCESS_TOKEN_SECRET!);
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
  const regexp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
  return regexp.test(password);
};

export const comparePasswords = (password1: string, password2: string) =>
  password1 === password2;
