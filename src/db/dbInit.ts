import mongoose from "mongoose";

export async function dbRun() {
  try {
    if (process.env.DATABASE_URL)
      await mongoose.connect(process.env.DATABASE_URL);
  } catch (error: any) {
    console.error(error);
  }
}

export async function dbClose() {
  try {
    await mongoose.disconnect();
    console.log("You successfully disconnected to MongoDB!");
  } catch (error: any) {
    console.error(error);
  }
}
