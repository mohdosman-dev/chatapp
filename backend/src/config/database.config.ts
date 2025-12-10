import { Env } from "./env.config";
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.error("Cannot connect to the DB", error);
    process.exit(1);
  }
};

export default connectDatabase;
