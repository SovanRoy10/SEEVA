import { User } from "../models/user.js";
import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import axios from "axios";
import cloudinary from "cloudinary";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { hashPassword } from "../Helpers/auth.js";
import jwt from "jsonwebtoken";

/* Sovan's Code for patient register 👇 */

// export const patientRegister = catchAsyncErros(async (req, res, next) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     dob,
//     gender,
//     profileImageUrl,
//     phone,
//   } = req.body;
//   if (
//     !firstName ||
//     !lastName ||
//     !email ||
//     !password ||
//     !dob ||
//     !gender ||
//     !phone
//   )
//     return next(new ErrorHandler("Please Fill Full Form!", 400));

//   const user = await User.create({
//     firstName,
//     lastName,
//     email,
//     password,
//     dob,
//     gender,
//     profileImageUrl,
//     phone,
//   });

//   return res.status(200).json({
//     success: true,
//     message: "User Registered!",
//   });
// });

/* Sovan's Code for login 👇 */

// export const login = catchAsyncErros(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return next(new ErrorHandler("Please Provide All Details!", 400));

//   try {
//     const jwtToken = await User.matchPasswordAndGenerateToken(email, password);
//     // console.log(jwtToken.tokenName, jwtToken.token);
//     return res
//       .cookie(jwtToken.tokenName, jwtToken.token, {
//         expires: new Date(
//           Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//       })
//       .json({
//         success: true,
//         message: "User logged in successfully!",
//       });
//   } catch (error) {
//     return next(new ErrorHandler(error, 400));
//   }
// });

export const addNewAdmin = catchAsyncErros(async (req, res, next) => {
  const {
    name,
    email,
    password,
    dob,
    gender,
    profileImageUrl,
    phone,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !dob ||
    !gender ||
    !phone
  )
    return next(new ErrorHandler("Please Fill Full Form!", 400));

  // Find the existing user by email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.role.includes("Admin")) {
      return next(
        new ErrorHandler("The user of this email is already an admin", 400)
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      // Query: Find user by email
      { email },

      // Update: Push "Admin" role into the role array
      { $push: { role: "Admin" } },

      //options: Return the modified document after update
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User role updated to admin!",
    });
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      dob,
      gender,
      profileImageUrl,
      phone,
      role: ["Admin"], // Assigning role as admin in an array
    });

    return res.status(200).json({
      success: true,
      message: "Admin user created successfully!",
    });
  }
});

export const getAllDoctors = catchAsyncErros(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const logoutAdmin = catchAsyncErros(async (req, res, next) => {
  return res.status(200).clearCookie("AdminToken").json({
    success: true,
    message: "Admin Successfully Logged Out",
  });
});

export const logoutPatient = catchAsyncErros(async (req, res, next) => {
  return res.status(200).clearCookie("UserToken").json({
    success: true,
    message: "User Successfully Logged Out",
  });
});

export const addNewDoctor = catchAsyncErros(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Doctor Avatar Required!", 400));

  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  let {
    doctorDepartment,
    registrationNumber,
    year,
    smcId,
    name,
    email,
    password,
    dob,
    gender,
    phone,
  } = req.body;

  doctorDepartment = doctorDepartment.trim();
  registrationNumber = registrationNumber.trim();
  year = year.trim();
  smcId = smcId.trim();
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dob = dob.trim();
  gender = gender.trim();
  phone = phone.trim();
  if (
    !doctorDepartment ||
    !registrationNumber ||
    !year ||
    !smcId ||
    !name ||
    !email ||
    !password ||
    !dob ||
    !gender ||
    !phone
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Calculate age from dob
  const registrationYear = new Date(year);
  const today = new Date();
  const birthDate = new Date(dob);
  let difference = registrationYear.getFullYear() - birthDate.getFullYear();
  let age = today.getFullYear() - birthDate.getFullYear();
  //   console.log(difference);
  const month1 = registrationYear.getMonth() - birthDate.getMonth();
  if (
    month1 < 0 ||
    (month1 === 0 && registrationYear.getDate() < birthDate.getDate())
  ) {
    difference--;
  }

  const month2 = today.getMonth() - birthDate.getMonth();
  if (month2 < 0 || (month2 === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Check if difference is at least 18
  if (difference < 18) {
    return next(
      new ErrorHandler(
        "You must be at least 18 years old to register as a doctor.",
        400
      )
    );
  }

  if (age > 70) {
    return next(
      new ErrorHandler(
        "We are only looking for doctors whose age is below 70.",
        400
      )
    );
  }

  // Construct the URL with parameters
  const apiUrl = `https://www.nmc.org.in/MCIRest/open/getPaginatedData?service=getPaginatedDoctor&start=0&length=500&name=${encodeURIComponent(
    encodeURIComponent(name)
  )}&registrationNo=${encodeURIComponent(
    registrationNumber
  )}&smcId=${encodeURIComponent(smcId)}&year=${encodeURIComponent(year)}`;

  const response = await axios.get(apiUrl);
  //   console.log(year, response.data.data[0][1]);

  // Check if the doctor is registered based on the response
  if (
    response.data &&
    response.data.data &&
    response.data.recordsTotal === 1 &&
    response.data.data[0][1].toString() === year &&
    response.data.data[0][2].toString() === registrationNumber &&
    response.data.data[0][4].toString() === name
  ) {
    // Doctor is registered

    // Check if a user with the same phone number or registration number already exists
    const existingUserWithPhone = await User.findOne({ phone });
    const existingUserWithRegNumber = await User.findOne({
      registrationNumber,
    });

    if (existingUserWithPhone) {
      return next(
        new ErrorHandler(
          "A user with the same phone number already exists.",
          400
        )
      );
    }

    if (existingUserWithRegNumber) {
      return next(
        new ErrorHandler(
          "A user with the same registration number already exists.",
          400
        )
      );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }

    // Find the existing doctor by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.role.includes("Doctor")) {
        return next(
          new ErrorHandler("The user of this email is already an Doctor", 400)
        );
      }

      // Update the user's role to Doctor and other details
      const updatedUser = await User.findOneAndUpdate(
        { email }, // Query
        {
          $set: {
            role: ["Doctor"],
            doctorDepartment,
            registrationNumber,
            smcId,
            year,
            profileImageUrl: cloudinaryResponse.secure_url, // Update avatar URL
          },
        },
        { new: true } // Options: return updated document
      );

      return res.status(200).json({
        success: true,
        message: "User role updated to Doctor!",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        doctorDepartment,
        registrationNumber,
        year,
        smcId,
        name,
        email,
        password: hashedPassword,
        dob,
        gender,
        phone,
        role: ["Doctor"], // Assigning role as admin in an array
        profileImageUrl: cloudinaryResponse.secure_url,
      });

      return res.status(200).json({
        success: true,
        message: "Doctor registered successfully!",
      });
    }
  } else {
    // Doctor is not registered
    next(new ErrorHandler("Doctor is not registered", 404));
  }
});

/* Rupal's code for Patient Regsiter 👇*/

export const patientRegister = catchAsyncErros(async (req, res, next) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password)
    return next(new ErrorHandler("Please Fill Full Form!", 400));

  let userExist = await User.findOne({ email }).exec();
  if (userExist) return next(new ErrorHandler("User already exist!", 400));

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({
    success: true,
    message: "User Registered!",
  });
});

/* Rupal's code for login 👇*/

export const login = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please Provide All Details!", 400));

  try {
    const jwtToken = await User.matchPasswordAndGenerateToken(email, password);
    // console.log(jwtToken.tokenName, jwtToken.token);
    return res
      .cookie(jwtToken.tokenName, jwtToken.token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
      })
      .json({
        success: true,
        message: "User logged in successfully!",
      });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

export const forgotPassword = catchAsyncErros(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler("Please provide your email", 400));
  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("No user found", 400));
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m",
    });

    const userEmail = email;
    const message = `Dear ${user.name},

    We received a request to reset your password for your [Your Platform Name] account. To proceed with this request, please follow the instructions below:
    
      1. Click on the following link to reset your password:
        ${process.env.FRONTEND_URL}/reset-password/${user.id}/${token}
    
      2. If you're unable to click on the link, please copy and paste it into your web browser's address bar.
    
      3. Once the link is opened, you will be directed to a page where you can create a new password for your account.
    
    If you did not request this password reset, please disregard this email. Your account is still secure, and no changes have been made.
    
    Thank you for using [Your Platform Name].
    
    Best regards,
    SEEVA Team`;
    let config = {
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    };

    var transporter = nodemailer.createTransport(config);

    let messageDetails = {
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: `Reset your password - SEEVA`,
      html: `
          <p>Dear ${user.name},</p>
          <p>We received a request to reset your password for your SEEVA account. To proceed with this request, please follow the instructions below:</p>
          
          <ol>
              <li>Click on the following link to reset your password:
                  <a href="${process.env.FRONTEND_URL}/reset-password/${user.id}/${token}" target="_blank">Reset Password</a>
              </li>
              <li>If you're unable to click on the link, please copy and paste it into your web browser's address bar.</li>
              <li>Once the link is opened, you will be directed to a page where you can create a new password for your account.</li>
          </ol>
          
          <p>If you did not request this password reset, please disregard this email. Your account is still secure, and no changes have been made.</p>
          
          <p>Thank you for using SEEVA.</p>
          
          <p>Best regards,<br>SEEVATeam</p>
      `,
  };
  

    let info = await transporter.sendMail(messageDetails);
    return res
      .status(200)
      .json({ success: true, message: "Mail send successfully" });
  } catch (err) {
    console.error(err);
  }
});

export const resetPassword = catchAsyncErros(async (req, res,next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  if(!password)   return next(new ErrorHandler("Enter Your New Password",400)); 

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return next(new ErrorHandler("Invalid Token",400));
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
})
