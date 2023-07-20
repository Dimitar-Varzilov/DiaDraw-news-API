import { NextFunction, Request, Response } from "express";
import News, { INews } from "../models/News";

const createNews = async (req: Request, res: Response, next: NextFunction) => {
  const newsReq: INews = req.body;
  const GeneratedNews = new News(newsReq);

  try {
    const news = await GeneratedNews.save();
    const obj = news.toObject();
    res.status(201).json({ obj });
  } catch (error) {
    res.status(500).json(error);
  }
};

const readNews = async (req: Request, res: Response, next: NextFunction) => {
  const newsId = req.params.newsId;

  try {
    const news = await News.findById(newsId);
    news
      ? res.status(200).json({ news })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const readAllNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await News.find();
    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateNews = async (req: Request, res: Response, next: NextFunction) => {
  const newsId = req.params.newsId;
  try {
    const news = await News.findById(newsId);
    if (news) {
      news.set(req.body);
      await news.save();
      return res.status(201).json(news);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  const newsId = req.params.newsId;
  try {
    const news = await News.findByIdAndDelete(newsId);
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
  readNews,
  readAllNews,
  updateNews,
  deleteNews,
};

export default newsController;
