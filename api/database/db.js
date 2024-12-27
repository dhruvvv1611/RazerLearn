import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;