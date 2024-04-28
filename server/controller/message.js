import nodemailer from "nodemailer";
import { Message } from "../models/message.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErros(async (req, res, next) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email || !message)
    return next(new ErrorHandler("Please Fill Full Form!", 400));

  await Message.create({ firstName, lastName, email, message });

  const data = {
    senderEmail: email,
    message,
  };

  const userEmail = "hopefulbose@getsafesurfer.com";
  let config = {
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  let messageDetails = {
    from: process.env.MAIL_USER,
    to: userEmail,
    subject: `SEEVA message from ${data.senderEmail}`,
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mail</title>
      </head>
      <body>
          ${data.message}
      </body>
      </html>`,
  };

  let info = await transporter.sendMail(messageDetails);

  return res
    .status(200)
    .json({ success: true, message: "Mail send successfully" });
});

export const getAllMessages = catchAsyncErros(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
