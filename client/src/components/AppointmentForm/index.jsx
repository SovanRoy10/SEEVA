import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import { toast } from "react-toastify";
import { departments } from "../data";
import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";


export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointmentDateTime: new Date(),
    department: "",
    doctor_name: "",
    address: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    if (formData.department) {
      fetchDoctors(formData.department);
    }
  }, [formData.department]);

  const fetchDoctors = async (department) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/user/doctor/${createSlug(department)}`,
        {
          withCredentials: true,
        }
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      toast.error("Failed to fetch doctors");
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
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
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
    // return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/appointment/post`,
        formData,
        { withCredentials: true }
      );
      setLoading(false)
      toast.success("Booked appointment");
    } catch (error) {
      console.error("Failed to book appointment:", error);
      const msg = error.data?.message || error.message;
      toast.error(msg);
      setLoading(false);
    }
  };

  const isDoctorAvailable = (date) => {
    const day = date.getDay();

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

  return (
    <form action="#" className="row" onSubmit={handleSubmit}>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">First Name</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Sovan"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Last Name</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Roy"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Phone Number</label>
        <input
          type="number"
          name="phone"
          className="cs_form_field"
          value={formData.phone}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Preferred Date
        </label>

        <div className="cs_with_icon_input">
          {/* <DatePicker
            selected={appointment_date}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            placeholderText="dd/mm/yyyy"
          /> */}
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
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Date of Birth</label>

        <div className="cs_with_icon_input">
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="cs_form_field"
            required
          />
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Email</label>
        <input
          type="email"
          className="cs_form_field"
          placeholder="sovanroy@gmail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6 mb-4">
        <label className="cs_input_label cs_heading_color">Department</label>
        <select
          className="cs_form_field"
          name="department"
          id="department"
          onChange={handleChange}
          value={formData.department}
        >
          {departments.map((department) => (
            <option
              value={department.charAt(0).toUpperCase() + department.slice(1)}
            >
              {department.charAt(0).toUpperCase() + department.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-6">
        <label
          className="cs_input_label cs_heading_color"
          htmlFor="doctor_name"
        >
          Doctor Name
        </label>
        <select
          id="doctor_name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          required
          className="cs_form_field"
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>

        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Address</label>
        <input
          type="text"
          name="address"
          className="cs_form_field"
          placeholder="Your address"
          value={formData.address}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Gender</label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="gender"
              id="maleGender"
              defaultValue="routineCheckup"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <label className="cs_radio_label" htmlFor="routineCheckup">
              Male
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="gender"
              id="femaleCheckup"
              defaultValue="newPatientVisit"
              defaultChecked=""
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <label className="cs_radio_label" htmlFor="newPatientVisit">
              Female
            </label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>

      <div className="col-lg-12">
        <button className="cs_btn cs_style_1">
          {loading ? (
            <SyncOutlined spin className="py-1" />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
}
