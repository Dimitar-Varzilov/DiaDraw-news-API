import { NextFunction, Request, Response } from "express";
import { getNewsById } from "../models/News";
import { IdentityBody } from "../interfaces/request";

export const checkOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newsId = req.params.id;
  const {
    identity: { id: userId },
  } = req.body as IdentityBody;

  try {
    const news = await getNewsById(newsId);
    if (!news) return res.sendStatus(404);
    if (news.createdBy !== userId) return res.sendStatus(403);
    next();
  } catch (error) {
    return res.sendStatus(500);
  }
};
