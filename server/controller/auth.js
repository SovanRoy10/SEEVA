import { comparePassword, hashPassword } from "../Helpers/auth.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import User from "./../models/user.js";
import jwt from "jsonwebtoken";

export const register = catchAsyncErros(async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    await User.findByIdAndUpdate(user.id, { token: token }, { new: true });

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
});

export const login = catchAsyncErros(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Invalid password");
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });
    user.password = undefined;
    await User.findByIdAndUpdate(user.id, { token: token }, { new: true });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error. Try again.");
  }
});
