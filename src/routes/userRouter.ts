import { Router } from "express";
import userController from "../controllers/User";
const { createUser, readUser, readAllUsers, updateUser, deleteUser } =
  userController;
const userRouter = Router();

userRouter.get("/", readAllUsers);
userRouter.get("/:id", readUser);
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
