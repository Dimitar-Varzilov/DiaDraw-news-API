import { Request, Response } from "express";
import {
  registerDto,
  createUser,
  getUserByEmail,
  loginDto,
} from "../models/User";
import { createHash, generateToken, random } from "../utils/password";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName }: registerDto = req.body;
    if (!email || !password || !fullName) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      fullName,
      authentication: {
        salt,
        password: createHash(salt, password),
      },
    });
    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as loginDto;
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = createHash(user.authentication.salt, password);

    if (expectedHash !== user.authentication.password) {
      return res.sendStatus(400);
    }

    const accessToken = generateToken(email);
    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
const authenticationController = { register, login };
export default authenticationController;
