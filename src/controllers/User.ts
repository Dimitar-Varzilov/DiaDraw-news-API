import { NextFunction, Request, Response } from "express";
import { deleteUserById, getUserById, updateUserInDb } from "../models/User";
import { checkPassword, createHash, random } from "../utils/password";

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const {
    password,
    user: { name: id },
  } = req.body;
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
    user: { name: id },
  } = req.body;
  try {
    if (!email || !password || !fullName || !id || password.length < 8) {
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
    user: { name: id },
  } = req.body;
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
