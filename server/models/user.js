import mongoose from "mongoose";
import validator from "validator";
const { createHmac, randomBytes } = require("node:crypto"); // for hashing the password

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Provide A Valid Email"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, "Phone Number Must Contain At Least 10 Digits!"],
      maxLength: [10, "Phone Number Must Contain At Max 10 Digits!"],
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    password: {
      type: String,
      minLength: [7, "Password Must Contain At Least 7 Characters!"],
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "Doctor", "Admin"],
      default: "Patient",
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

export const user = mongoose.model("User", userSchema);
