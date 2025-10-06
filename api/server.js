  /* eslint-disable */
  import express from "express";
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  import cors from "cors";
  import cookieParser from "cookie-parser";
  import path from "path";

  // Routes
  import userRoute from "./routes/user.route.js";
  import conversationRoute from "./routes/conversation.route.js";
  import gigRoute from "./routes/gig.route.js";
  import messageRoute from "./routes/message.route.js";
  import orderRoute from "./routes/order.route.js";
  import reviewRoute from "./routes/review.route.js";
  import authRoute from "./routes/auth.route.js";
  import categoryRoute from "./routes/category.route.js";

  dotenv.config();
  const app = express();

  // 🧠 برای trust proxy در Render (برای کوکی‌ها و HTTPS)
  app.set("trust proxy", 1);

  // ✅ تنظیم Origin برای Render و Local
  const allowedOrigins = [
    "http://localhost:3000",
    "https://afghan-tech-freelancers-f.onrender.com",
    "https://www.afghan-tech-freelancers-f.onrender.com",
  ];

  // ✅ Middlewares
  app.use(express.json());
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.error("❌ CORS blocked origin:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // برای ارسال کوکی‌ها
    })
  );
  app.use(cookieParser());

  // ✅ Routes
  app.use("/api/v1/conversations", conversationRoute);
  app.use("/api/v1/gigs", gigRoute);
  app.use("/api/v1/messages", messageRoute);
  app.use("/api/v1/orders", orderRoute);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/categories", categoryRoute);

  // ✅ Error handler
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    const errorDetails = process.env.NODE_ENV === "development" ? err.stack : {};

    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: errorDetails,
    });
  });

  // ✅ MongoDB Connection
  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
    }
  };

  // ✅ Production setup (serve React build)
  if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

  // ✅ Server listen
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    connect();
    console.log(`🚀 Backend server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  });
