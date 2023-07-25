import { Router } from "express";
import authenticationController from "../controllers/Authentication";
const { login, register } = authenticationController;

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

export default authRouter;
