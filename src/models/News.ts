import { Schema, model, Document } from "mongoose";

export interface INews {
  title: string;
  type: string;
  content: string;
  author: string;
  created_at: number;
  created_by: string;
}

export interface INewsModel extends INews, Document {}

const newsSchema: Schema<INews> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    created_at: {
      type: Number,
      required: true,
      default: Date.now,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const News = model<INewsModel>("User", newsSchema);
export default News;
