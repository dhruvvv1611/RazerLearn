import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";

dotenv.config({});
connectDB();
const app = express();

app.use(express.json());

app.use("api/v1/user", userRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000");
});
