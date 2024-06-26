import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  vaccine: {
    type: String,
    required: true,
  },
  isValidRange: {
    type: Boolean,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
