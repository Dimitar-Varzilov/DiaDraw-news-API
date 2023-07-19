import mongoose from "mongoose";

export async function connectToDb() {
  try {
    if (process.env.DATABASE_URL)
      await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to Database");
  } catch (error: any) {
    console.error(error);
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
