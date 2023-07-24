import { Request, Response } from "express";
import {
  registerDto,
  createUser,
  getUserByEmail,
  loginDto,
} from "../models/User";
import {
  checkPassword,
  createHash,
  generateToken,
  random,
} from "../utils/password";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body as registerDto;
    if (!email || !password || !fullName || password.length < 8) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    await createUser({
      email,
      fullName,
      authentication: {
        salt,
        password: createHash(salt, password),
      },
    });
    return res.status(201).json({ email, fullName });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as loginDto;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    if (
      !checkPassword(
        user.authentication.salt,
        password,
        user.authentication.password
      )
    ) {
      return res.sendStatus(400);
    }

    const accessToken = generateToken(user._id);
    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
const authenticationController = { register, login };
export default authenticationController;
