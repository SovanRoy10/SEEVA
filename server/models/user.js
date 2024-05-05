import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from "validator";
import { createTokenForUser } from "../service/auth.js";
import { comparePassword } from "../Helpers/auth.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "Name Must Contain At Least 3 Characters!"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Provide A Valid Email"],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [6, "Password Must Contain At Least 6 Characters!"],
      maxLength: [64, "Password Must Contain At Max 64 Characters!"],
    },
    token: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      minLength: [10, "Phone Number Must Contain At Least 10 Digits!"],
      maxLength: [10, "Phone Number Must Contain At Max 10 Digits!"],
      unique: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: [String],
      required: true,
      enum: ["Patient", "Doctor", "Admin"],
      default: ["Patient"],
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
      unique: true,
    },
    smcId: {
      type: String,
    },
    year: {
      type: String,
    },
    feePerConsultation: {
      type: Number,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    monday: { type: Boolean },
    tuesday: { type: Boolean },
    wednesday: { type: Boolean },
    thursday: { type: Boolean },
    friday: { type: Boolean },
    saturday: { type: Boolean },
    sunday: { type: Boolean },
    doctorStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
    },
    doctorDegrees: [
      {
        institution: { type: String },
        description: { type: String },
      },
    ],
    doctorExperience: {
      type: [String],
    },
    doctorDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email }).exec();
    if (!user) throw new Error("User not found!");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Password is not correct");

    const jwtToken = createTokenForUser(user);
    this.password = undefined;
    await this.findByIdAndUpdate(
      user._id,
      { token: jwtToken.token },
      { new: true }
    );

    return jwtToken;
  }
);

export const User = mongoose.model("User", userSchema);
