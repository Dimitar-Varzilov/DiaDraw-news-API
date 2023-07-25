import { Request } from "express";

export interface IUserToken {
  id: string;
}

export interface ICombinedBody extends Request {
  user: IUserToken;
  [key: string]: any;
}
