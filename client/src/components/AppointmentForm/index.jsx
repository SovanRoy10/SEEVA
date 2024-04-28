import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export default function AppointmentForm() {
  const [appointment_date, setSelectedDate] = useState(null);
  const [dob, setSelectedDateofBirth] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");

  const [reason, setReasonForVisit] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [doctor_name, setDoctor] = useState("");
  const [hasVisited, setIsVisited] = useState(false);

  const handleReasonChange = (event) => {
    setReasonForVisit(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
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
      department,
      doctor_name,
      hasVisited,
      address,
      reason,
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
        <label className="cs_input_label cs_heading_color">Name</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Sovan Roy"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Phone Number</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="(123) 456 - 789"
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
          <DatePicker
            selected={appointment_date}
            onChange={(date) => setSelectedDate(date)}
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
        <label className="cs_input_label cs_heading_color">
          Reason for Visit
        </label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="routineCheckup"
              defaultValue="routineCheckup"
              value="Routine Checkup"
              checked={reason === "Routine Checkup"}
              onChange={handleReasonChange}
            />
            <label className="cs_radio_label" htmlFor="routineCheckup">
              Routine Checkup
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="newPatientVisit"
              defaultValue="newPatientVisit"
              defaultChecked=""
              value="New Patient Visit"
              checked={reason === "New Patient Visit"}
              onChange={handleReasonChange}
            />
            <label className="cs_radio_label" htmlFor="newPatientVisit">
              New Patient Visit
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="specificConcern"
              defaultValue="specificConcern"
              value="Specific Concern"
              checked={reason === "Specific Concern"}
              onChange={handleReasonChange}
            />
            <label className="cs_radio_label" htmlFor="specificConcern">
              Specific Concern
            </label>
          </div>
        </div>
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
        <label className="cs_input_label cs_heading_color">Department</label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="pediatric"
              defaultValue="pediatric"
              value="Pediatric"
              checked={department === "Pediatric"}
              onChange={handleDepartmentChange}
            />
            <label className="cs_radio_label" htmlFor="pediatric">
              Pediatric
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="obstetricsGynecology"
              defaultValue="obstetricsGynecology"
              defaultChecked=""
              value="Obstetrics and Gynecology"
              checked={department === "Obstetrics and Gynecology"}
              onChange={handleDepartmentChange}
            />
            <label className="cs_radio_label" htmlFor="obstetricsGynecology">
              Obstetrics and Gynecology
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="cardiology"
              defaultValue="cardiology"
              value="Cardiology"
              checked={department === "Cardiology"}
              onChange={handleDepartmentChange}
            />
            <label className="cs_radio_label" htmlFor="cardiology">
              Cardiology
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="neurology"
              defaultValue="neurology"
              value="Neurology"
              checked={department === "Neurology"}
              onChange={handleDepartmentChange}
            />
            <label className="cs_radio_label" htmlFor="neurology">
              Neurology
            </label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
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
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Visited Before?
        </label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="visit"
              id="visited"
              defaultValue="routineCheckup"
              value="true"
              checked={hasVisited === true}
              onChange={() => setIsVisited(true)}
            />
            <label className="cs_radio_label" htmlFor="routineCheckup">
              Yes
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="visit"
              id="notVisited"
              defaultValue="newPatientVisit"
              value="false"
              checked={hasVisited === false}
              onChange={() => setIsVisited(false)}
            />
            <label className="cs_radio_label" htmlFor="newPatientVisit">
              No
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
