import { randomBytes, createHmac } from "crypto";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();
export const random = () => randomBytes(128).toString("base64");

export const createHash = (salt: string, password: string) =>
  createHmac("sha256", [salt, password].join("/"))
    .update(process.env.PASSWORD_SECRET!)
    .digest("hex");

export const generateToken = (input: string) => {
  const user = { name: input };

  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
};

export const checkPassword = (
  salt: string,
  password: string,
  userPassword: string
): boolean => {
  const expectedHash = createHash(salt, password);
  return expectedHash === userPassword;
};
