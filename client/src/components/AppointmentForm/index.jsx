import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { toast } from "react-toastify";
import { departments } from "../data";

export default function AppointmentForm() {
  const [appointment_date, setSelectedDate] = useState(null);
  const [dob, setSelectedDateofBirth] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  // const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [doctor_name, setDoctor] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name,
      email,
      phone,
      dob: dob ? dob.toISOString() : null,
      gender,
      appointment_date: appointment_date
        ? appointment_date.toISOString()
        : null,
      // department,
      doctor_name,

      address,
    };
    try {
      await axios.post("http://localhost:8000/api/post", formData);
      toast.success("Registration Successfull");
    } catch (err) {
      toast.error(err.response.data);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Last Name</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Roy"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Phone Number</label>
        <input
          type="number"
          className="cs_form_field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          <Datetime
            value={appointment_date}
            onChange={(date) => setSelectedDate(date)}
            inputProps={{ placeholder: "dd/mm/yyyy hh:mm" }}
            dateFormat="DD/MM/YYYY"
            timeFormat="HH:mm"
            closeOnSelect
            isClearable
            placeholderText="dd/mm/yyyy hh:mm"
          />
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Date of Birth</label>

        <div className="cs_with_icon_input">
          <DatePicker
            selected={dob}
            onChange={(date) => setSelectedDateofBirth(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            placeholderText="dd/mm/yyyy"
          />
          <i>
            <Icon icon="fa6-solid:calendar-days" />
          </i>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Email</label>
        <input
          type="email"
          className="cs_form_field"
          placeholder="sovanroy@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6 mb-4">
        <label className="cs_input_label cs_heading_color">Department</label>
        <select className="cs_form_field" name="department" id="department">
          {departments.map((department) => (
            <option value={department}>
              {department.charAt(0).toUpperCase() + department.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Doctor Name</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Dr Rupal Paul"
          value={doctor_name}
          onChange={(e) => setDoctor(e.target.value)}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Address</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
              checked={gender === "Male"}
              onChange={handleGenderChange}
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
              checked={gender === "Female"}
              onChange={handleGenderChange}
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
          <span>Submit</span>
          <i>
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
          </i>
        </button>
      </div>
    </form>
  );
}
