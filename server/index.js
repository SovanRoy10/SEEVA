import express from "express";
import "dotenv/config";
import connectDB from "./config/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// routers
import messageRouter from "./router/messageRouter.js";

const app = express();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: [process.env.FORNTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
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
