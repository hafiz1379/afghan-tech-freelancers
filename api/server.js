/* eslint-disable*/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import categoryRoute from "./routes/category.route.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://afghan-tech-freelancers-f.onrender.com",
];

dotenv.config();
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    // eslint-disable-next-line func-names, object-shorthand
    origin: function (origin, callback) {
      if (!origin) return callback(new Error("Not allowed by CORS"));

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

// ROUTES
app.use("/api/v1/conversations", conversationRoute);
app.use("/api/v1/gigs", gigRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories", categoryRoute);

app.use((err, req, res) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on port ${PORT}!`);
});
