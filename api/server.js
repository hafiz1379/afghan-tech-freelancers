import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/v1/conversations", conversationRoute);
app.use("/api/v1/gigs", gigRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.listen(8000, () => {
  connect();
  console.log("Backend server is running!");
});
