import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Rupal",
    lastName: "Pal",
    email: "roysovan204@gmail.com",
    phone: "8439306329",
    dob: "09/12/2002",
    gender: "Male",
    appointmentDateTime: "04/24/2024",
    department: "Gynecologist",
    doctor_name: "SOUMYA SUVRA PATRA",
    address: "dumdum road"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white mt-5">
      <div className="mb-6">
        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
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
        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="appointmentDateTime" className="block mb-2 text-sm font-medium text-gray-900">Appointment Date</label>
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
        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="doctor_name" className="block mb-2 text-sm font-medium text-gray-900">Doctor Name</label>
        <input
          type="text"
          id="doctor_name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
  );
};

export default UserForm;
