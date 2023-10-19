import { Router } from "express";
import newsController from "../controllers/News";
import { checkOwnership } from "../middlewares/checkOwner";
import { authenticateToken } from "../middlewares/authenticateToken";
const { createNews, deleteNews, readAllNews, readAllNewsByUser, updateNews } =
  newsController;
const newsRouter = Router();

newsRouter.get("/", readAllNews);
newsRouter.get("/me", authenticateToken, readAllNewsByUser);
newsRouter.post("/", authenticateToken, createNews);
newsRouter.patch("/:id", authenticateToken, checkOwnership, updateNews);
newsRouter.delete("/:id", authenticateToken, checkOwnership, deleteNews);

export default newsRouter;

