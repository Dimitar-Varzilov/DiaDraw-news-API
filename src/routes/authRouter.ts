import { Router } from "express";
import { config } from "dotenv";
import authenticationController from "../controllers/Authentication";
const { login, register } = authenticationController;
config();

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

export default authRouter;
