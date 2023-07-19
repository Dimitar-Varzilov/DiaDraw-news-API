import express, { Express, json } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./src/db/dbInit";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
connectToDb();

app.use(json());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
