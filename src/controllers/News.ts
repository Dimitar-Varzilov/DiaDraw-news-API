import { NextFunction, Request, Response } from "express";
import {
  createNewsInDb,
  deleteNewsById,
  getAllUserNews,
  getNews,
  newsDto,
  updateNewsInDb,
} from "../models/News";
import { IdentityBody } from "../interfaces/request";

const createNews = async (req: Request, res: Response, next: NextFunction) => {
  const newsReq = req.body as newsDto;

  try {
    const generatedNews = await createNewsInDb(newsReq);
    if (!generatedNews) return res.sendStatus(400);
    return res.status(201).json({ generatedNews });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const readAllNewsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      identity: { id },
    } = req.body as IdentityBody;
    if (!id) return res.sendStatus(400);
    const news = await getAllUserNews(id);
    return news
      ? res.status(200).json({ news })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const readAllNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await getNews();
    return res.status(200).json({ news });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const news = await updateNewsInDb(id, req.body);
    return news
      ? res.status(200).json({ news })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const news = await deleteNewsById(id);
    if (news) {
      return res.status(200).json({ message: "deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const newsController = {
  createNews,
  readAllNewsByUser,
  readAllNews,
  updateNews,
  deleteNews,
};

export default newsController;
