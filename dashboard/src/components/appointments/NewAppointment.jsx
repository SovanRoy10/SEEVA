import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointmentDateTime: "",
    department: "",
    doctor_name: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    // Submit logic here

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        formData,
        { withCredentials: true }
      );
      toast.success("Booked appointment");
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to book appointment:", error);
      const msg = error.data?.message;
      toast.error(msg);
    }
  };

  const handleCancel = () => {
    navigate("/appointments");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 grid grid-cols-2 gap-4"
    >
      <div className="mb-6">
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-900"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="dob"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          htmlFor="appointmentDateTime"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Appointment Date
        </label>
        <input
          type="datetime-local"
          id="appointmentDateTime"
          name="appointmentDateTime"
          value={formData.appointmentDateTime}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="department"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Department
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Enter department"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="doctor_name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Doctor Name
        </label>
        <input
          type="text"
          id="doctor_name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          placeholder="Enter doctor's name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Cancel
      </button>
    </form>
  );
};

export default AppointmentForm;
