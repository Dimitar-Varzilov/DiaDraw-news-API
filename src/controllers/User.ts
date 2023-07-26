import { NextFunction, Request, Response } from "express";
import {
  deleteUserById,
  getUserById,
  registerDto,
  updateUserInDb,
} from "../models/User";
import {
  checkPassword,
  createHash,
  random,
  validatePassword,
} from "../utils/password";
import { IdentityBody, IVerifyBody } from "../interfaces/request";

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const {
    password,
    identity: { id },
  } = req.body as IdentityBody<IVerifyBody>;
  try {
    if (!password) return res.sendStatus(400);
    const user = await getUserById(id).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) return res.sendStatus(400);
    checkPassword(
      user.authentication.salt,
      password,
      user.authentication.password
    )
      ? res.sendStatus(200)
      : res.sendStatus(400);
  } catch (error) {
    res.status(500);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    fullName,
    identity: { id },
  } = req.body as IdentityBody<registerDto>;
  try {
    if (
      !email ||
      !password ||
      !fullName ||
      !id ||
      !validatePassword(password)
    ) {
      return res.sendStatus(400);
    }
    const salt = random();
    const updatedUser = await updateUserInDb(id, {
      email,
      fullName,
      authentication: {
        salt,
        password: createHash(salt, password),
      },
    });
    if (!updatedUser) return res.sendStatus(400);
    return res.status(200).send({ email, fullName });
  } catch (error) {
    return res.status(500);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    identity: { id },
  } = req.body as IdentityBody;
  try {
    const user = await deleteUserById(id);
    if (user) {
      return res.status(200).json({ message: "Deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500);
  }
};

const userController = {
  verify,
  updateUser,
  deleteUser,
};

export default userController;
