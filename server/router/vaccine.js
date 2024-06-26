import express from "express";
import Booking from "../models/vaccine.js";
import https from "https";
import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

const options = {
  method: "GET",
  hostname: "coronavirus-smartable.p.rapidapi.com",
  path: "/news/v1/global/",
  headers: {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": RAPIDAPI_HOST,
  },
};

router.get("/global-news", (req, res) => {
  const request = https.request(options, function (response) {
    const chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function () {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  request.on("error", function (error) {
    console.error("Error fetching global news:", error);
    res.status(500).json({ error: "Failed to fetch global news" });
  });

  request.end();
});

const hospitalLocation = {
  lat: 22.983611,
  lng: 88.482612,
};
const vaccinationRange = 50;

router.post("/create-booking", isUserAuthenticated, async (req, res) => {
  const { name, age, aadharNumber, gender, phoneNumber, lat, lng } = req.body;

  try {
    const distance = getDistanceFromLatLonInKm(
      lat,
      lng,
      hospitalLocation.lat,
      hospitalLocation.lng
    );
    const isValidRange = distance <= vaccinationRange;
    if (!isValidRange)
      return res.status(400).send("Selected location is out of range");

    const randomNum = getRandom4DigitNumber();
    const vaccine =
      age < 11 ? `Covaxin-${randomNum}` : `Covishield-${randomNum}`;

    const newBooking = new Booking({
      name,
      age,
      aadharNumber,
      gender,
      phoneNumber,
      lat,
      lng,
      vaccine,
      isValidRange,
    });

    await newBooking.save();

    res.status(200).send("Booking confirmed and saved");
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).send("Server error");
  }
});

router.get("/bookings", isAdminAuthenticated, async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json({
    success: true,
    bookings,
  });
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

export default router;
