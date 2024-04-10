import express from "express";
import "dotenv/config";
import connectDB from "./config/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import authRouter from "./router/auth.js";

// routers
import messageRouter from "./router/messageRouter.js";

// middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

const port = process.env.PORT || 4000;

// cors for connecting frontend with backend

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// https://www.npmjs.com/package/express-fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// routes
app.use("/api/v1/message", messageRouter);
app.use("/api", authRouter);

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
