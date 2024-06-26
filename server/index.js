import express from "express";
import "dotenv/config";
import connectDB from "./config/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import morgan from "morgan";
import path from "path";
import axios from "axios";
// cloudinary
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

// routers
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import blogRouter from "./router/blogRouter.js";
import vaccineRouter from "./router/vaccine.js";


// middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

const port = process.env.PORT || 4000;

// cors for connecting frontend with backend
// console.log(typeof process.env.FRONTEND_URL, typeof process.env.DASHBOARD_URL)

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// https://www.npmjs.com/package/express-fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);



// routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/vaccine", vaccineRouter);


// app.use("/api", authRouter);  /* Rupal made this route */

// middlewares
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB() // Calling connectDB function to establish MongoDB connection
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!! ", err);
  });
