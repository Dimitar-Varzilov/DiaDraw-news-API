import express, { Express, json } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./src/db/dbInit";
import newsRouter from "./src/routes/newsRouter";
import userRouter from "./src/routes/userRouter";
import authRouter from "./src/routes/authRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
connectToDb();

app.use(json());

app.use("/news", newsRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
