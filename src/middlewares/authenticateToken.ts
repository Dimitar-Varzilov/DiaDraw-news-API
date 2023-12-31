import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, identity) => {
    if (err) return res.sendStatus(401);
    req.body = { ...req.body, identity };
    next();
  });
};
