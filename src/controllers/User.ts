import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userReq: IUser = req.body;
  const GeneratedUser = new User(userReq);

  try {
    await GeneratedUser.validate();
    await GeneratedUser.save();
    res.status(201).json({ GeneratedUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const readAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      const updatedUser = user.set(req.body);
      await updatedUser.validate();
      const responseUser = await updatedUser.save();
      return res.status(201).json({ responseUser });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({ message: "deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const userController = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
};

export default userController;
