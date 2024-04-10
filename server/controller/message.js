import nodemailer from "nodemailer";
import { Message } from "../models/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    if (!firstName || !lastName || !email || !message)
      return res.status(400).json({
        success: false,
        message: "Please Fill Full Form",
      });

    await Message.create({ firstName, lastName, email, message });

    const data = {
      senderEmail: email,
      message,
    };

    const userEmail = "interestinglehmann@ysosirius.com";
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
      subject: `Portfolio Contact Us from ${data.senderEmail}`,
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
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: true, message: "There is a Problem" });
  }
};
