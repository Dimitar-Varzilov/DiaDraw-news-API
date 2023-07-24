import { Router } from "express";
import userController from "../controllers/User";
import { getUsers } from "../models/User";
import { authenticateToken } from "../middlewares/authenticateToken";
const { verify, updateUser, deleteUser } = userController;
const userRouter = Router();

// For development purposes only (
userRouter.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});
//)

userRouter.post("/", authenticateToken, verify);
userRouter.patch("/", authenticateToken, updateUser);
userRouter.delete("/", authenticateToken, deleteUser);

export default userRouter;
