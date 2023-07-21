import { NextFunction, Request, Response } from "express";
import News, { INews } from "../models/News";

const createNews = async (req: Request, res: Response, next: NextFunction) => {
  const newsReq: INews = req.body;
  const GeneratedNews = new News(newsReq);

  try {
    await GeneratedNews.validate();
    await GeneratedNews.save();
    res.status(201).json({ GeneratedNews });
  } catch (error) {
    res.status(500).json(error);
  }
};

const readNews = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const news = await News.findById(id);
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
  const id = req.params.id;
  try {
    const news = await News.findById(id);
    if (news) {
      const updatedNews = news.set(req.body);
      await updatedNews.validate();
      const responseNews = await updatedNews.save();
      return res.status(201).json({ responseNews });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const news = await News.findByIdAndDelete(id);
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
