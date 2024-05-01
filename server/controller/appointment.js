import { catchAsyncErros } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointment.js";
import { User } from "../models/user.js";

export const postAppointment = catchAsyncErros(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointmentDateTime,
    department,
    doctor_name,
    address,
  } = req.body;

  console.log(req.body);

  const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "dob",
    "gender",
    "appointmentDateTime",
    "department",
    "doctor_name",
    "address",
  ];

  // Check if all required fields are present
  for (const field of fields) {
    if (!req.body[field]) {
      return next(new ErrorHandler(`Please fill the ${field} field.`, 400));
    }
  }

  // Checking if there's an existing appointment at the same date and time
  const existingAppointment = await Appointment.findOne({
    appointmentDateTime,
  });
  if (existingAppointment) {
    return next(new ErrorHandler("Appointment slot already booked!", 400));
  }

  const isConflict = await User.find({
    name: doctor_name,
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointmentDateTime,
    department,
    doctor: {
      name: doctor_name,
    },
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });
});

export const getAllAppointments = catchAsyncErros(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncErros(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true, // This option specifies that the method should return the modified document rather than the original one.
      runValidators: true, // This option tells Mongoose to run any validation defined in the schema on the updated data.
      //   useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);

export const deleteAppointment = catchAsyncErros(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
