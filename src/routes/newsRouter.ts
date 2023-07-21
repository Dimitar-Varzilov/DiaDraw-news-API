import { Router } from "express";
import newsController from "../controllers/News";
const { createNews, deleteNews, readAllNews, readNews, updateNews } =
  newsController;
const newsRouter = Router();

newsRouter.get("/", readAllNews);
newsRouter.get("/:id", readNews);
newsRouter.post("/", createNews);
newsRouter.patch("/:id", updateNews);
newsRouter.delete("/:id", deleteNews);

export default newsRouter;
