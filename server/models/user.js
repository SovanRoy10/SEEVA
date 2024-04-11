import mongoose from "mongoose";
import validator from "validator";
import { createHmac, randomBytes } from "node:crypto"; // for hashing the password
import { createTokenForUser } from "../service/auth.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name Must Contain At Least 3 Characters!"],
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
      minLength: [6, "Password Must Contain At Least 6 Characters!"],
      required: true,
    },
    role: {
      type: [String],
      required: true,
      enum: ["Patient", "Doctor", "Admin"],
      default: ["Patient"],
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    salt: {
      type: String,
    },
    doctorDepartment: {
      type: String,
      enum: [
        "Eye Care",
        "Gynecologist",
        "Psychotherapist",
        "Orthopedic",
        "Dentist",
        "Gastrologist",
        "Urologist",
        "Neurologist",
      ],
    },
    registrationNumber: {
      type: String,
      unique : true
    },
    smcId: {
      type: String,
    },
    year: {
      type: String,
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

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");
    const salt = user.salt;
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (userProvidedHash === user.password) return createTokenForUser(user);
    else throw new Error("Password is not correct");
  }
);

export const User = mongoose.model("User", userSchema);
