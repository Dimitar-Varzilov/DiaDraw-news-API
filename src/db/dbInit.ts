import mongoose from "mongoose";

export async function connectToDb() {
  try {
    const dbConnection = await mongoose.connect(process.env.DATABASE_URL ?? "");
    if (dbConnection) {
      console.log("Connected to Database");
    } else {
      throw Error("Fail to connect to db");
    }
  } catch (error: any) {
    console.error(error);
    throw Error("Fail to connect to db");
  }
}

export async function disconnectFromDb() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  } catch (error: any) {
    console.error(error);
  }
}
