import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { doctorDepartment } from "../../data";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointmentDateTime: new Date(),
    department: "Eye Care",
    doctor_name: "",
    address: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (formData.department) {
      fetchDoctors(formData.department);
    }
  }, [formData.department]);

  const fetchDoctors = async (department) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/user/doctor/${createSlug(department)}`,
        {
          withCredentials: true,
        }
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      toast.error(error.data?.message || error.message)
    }
  };

  useEffect(() => {
    if (formData.doctor_name) {
      const doctor = doctors.find((doc) => doc.name === formData.doctor_name);
      setSelectedDoctor(doctor);
    }
  }, [formData.doctor_name, doctors]);

  function createSlug(text) {
    return text
      .toLowerCase() // Convert text to lowercase
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single hyphen
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      appointmentDateTime: date,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        formData,
        { withCredentials: true }
      );
      toast.success("Booked appointment");
      navigate("/appointments");
    } catch (error) {
      console.log(error.data || error.message);
      const msg = error.data?.message || error.message;
      toast.error("The slot maybe already booked" || msg);
    }
  };

  const handleCancel = () => {
    navigate("/appointments");
  };

  const isDoctorAvailable = (date) => {
    const day = date.getDay();
    // Map days to their corresponding availability in the doctor object
    const availability = {
      1: selectedDoctor?.monday || 0,
      2: selectedDoctor?.tuesday || 0,
      3: selectedDoctor?.wednesday || 0,
      4: selectedDoctor?.thursday || 0,
      5: selectedDoctor?.friday || 0,
      6: selectedDoctor?.saturday || 0,
      0: selectedDoctor?.sunday || 0,
    };
    return availability[day];
  };

  const getMinTime = (date) => {
    if (isDoctorAvailable(date)) {
      const today = new Date();
      today.setHours(
        parseInt(selectedDoctor?.startTime?.split(":")[0] || 0),
        parseInt(selectedDoctor?.startTime.split(":")[1] || 0),
        0
      );
      return today;
    }
  };

  const getMaxTime = (date) => {
    if (isDoctorAvailable(date)) {
      const today = new Date();
      today.setHours(
        parseInt(selectedDoctor?.endTime?.split(":")[0] || 23),
        parseInt(selectedDoctor?.endTime.split(":")[1] || 59),
        0
      );
      return today;
    }
  };

  // console.log(selectedDoctor?.endTime?.split(':')[0])

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 grid grid-cols-2 gap-4"
    >
      <div className="mb-6">
        <label
          htmlFor="firstName"
          className="block mb-2  font-medium text-gray-900"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="lastName"
          className="block mb-2  font-medium text-gray-900"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block mb-2  font-medium text-gray-900"
        >
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dob" className="block mb-2  font-medium text-gray-900">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="gender"
          className="block mb-2  font-medium text-gray-900"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="department"
          className="block mb-2  font-medium text-gray-900"
        >
          Department
        </label>
        <select
          name="department"
          id="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {doctorDepartment.map((dept) => {
            return (
              <option key={dept} value={dept}>
                {dept}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="doctor_name"
          className="block mb-2 font-medium text-gray-900"
        >
          Doctor Name
        </label>
        <select
          id="doctor_name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="block mb-2 font-medium text-gray-900"
          name="appointmentDateTime"
          htmlFor="appointmentDateTime"
        >
          Appointment Date and Time
        </label>
        <DatePicker
          id="appointmentDateTime"
          selected={formData.appointmentDateTime}
          onChange={handleDateChange}
          filterDate={isDoctorAvailable}
          showTimeSelect
          minTime={getMinTime(formData.appointmentDateTime)}
          maxTime={getMaxTime(formData.appointmentDateTime)}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="address"
          className="block mb-2  font-medium text-gray-900"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg  w-full px-5 py-2.5 text-center"
      >
        Cancel
      </button>
    </form>
  );
};

export default AppointmentForm;
