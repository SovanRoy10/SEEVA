import { Icon } from "@iconify/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { councils, departments, weekdays } from "../../data";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    doctorDepartment: "",
    registrationNumber: "",
    smcId: "",
    year: "",
    feePerConsultation: "",
    status: "",
    startTime: "",
    endTime: "",
    password: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    docAvatar: null,
    doctorDegrees: [{ institution: "", description: "" }],
    doctorExperience: [""],
    doctorDescription: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [value]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({ ...prevState, docAvatar: file }));
    }
  };
  const handleDegreeChange = (index, e) => {
    const updatedDegrees = [...formData.doctorDegrees];
    updatedDegrees[index][e.target.name] = e.target.value;
    setFormData({ ...formData, doctorDegrees: updatedDegrees });
  };

  const handleAddDegree = () => {
    setFormData({
      ...formData,
      doctorDegrees: [
        ...formData.doctorDegrees,
        { institution: "", description: "" },
      ],
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      doctorExperience: [...formData.doctorExperience, ""],
    });
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperience = [...formData.doctorExperience];
    updatedExperience[index] = e.target.value;
    setFormData({ ...formData, doctorExperience: updatedExperience });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // return;
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    formData.doctorDegrees.forEach((degree, index) => {
      data.append(`doctorDegrees[${index}][institution]`, degree.institution);
      data.append(`doctorDegrees[${index}][description]`, degree.description);
    });
    formData.doctorExperience.forEach((experience, index) => {
      data.append(`doctorExperience[${index}]`, experience);
    });
    // console.log([...data]);
    // return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/user/doctor/addNew`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success("Doctor registered successfully!");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to register doctor.";
      toast.error(errorMessage);
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
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Phone Number</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="(123) 456 - 789"
          value={formData.phone}
          onChange={handleChange}
          name="phone"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>

      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Date of Birth</label>

        <div className="cs_with_icon_input">
          <input
            type="date"
            className="cs_form_field"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
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
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Registration Number
        </label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="12345-6789"
          value={formData.registrationNumber}
          onChange={handleChange}
          name="registrationNumber"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Year of Registration
        </label>
        <input
          type="text"
          className="cs_form_field"
          value={formData.year}
          onChange={handleChange}
          name="year"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color" htmlFor="StartTime">
          Start Time
        </label>
        <input
          type="time"
          className="cs_form_field"
          placeholder="8:00"
          name="startTime"
          id="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color" htmlFor="EndTime">
          End Time
        </label>
        <input
          type="time"
          className="cs_form_field"
          placeholder="11:59"
          name="endTime"
          id="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-7 mb-4">
        <label className="cs_input_label cs_heading_color">Council</label>
        <select
          className="cs_form_field"
          name="smcId"
          id="smcId"
          value={formData.smcId}
          onChange={handleChange}
        >
          {councils.map((council) => (
            <option key={council.id} value={council.id}>
              {council.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-5">
        <label className="cs_input_label cs_heading_color">
          Fee per Consultaion(₹)
        </label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="500"
          value={formData.feePerConsultation}
          onChange={handleChange}
          name="feePerConsultation"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6 mb-4">
        <label className="cs_input_label cs_heading_color">Department</label>
        <select
          className="cs_form_field"
          name="doctorDepartment"
          id="doctorDepartment"
          value={formData.doctorDepartment}
          onChange={handleChange}
        >
          {departments.map((department) => (
            <option value={department}>
              {department.charAt(0).toUpperCase() + department.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Password</label>
        <input
          type="password"
          className="cs_form_field"
          placeholder="*******"
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Avalibility</label>
        <div className="flex flex-wrap -mx-2">
          {weekdays.map((day) => (
            <div className="px-2 mb-2">
              <div className="flex flex-wrap -mx-2 mr-1">
                <input
                  className="cs_checkbox_input mr-1"
                  type="checkbox"
                  name="Availability"
                  id={day}
                  defaultValue={day}
                  value={day}
                  checked={formData[day]}
                  onChange={handleChange}
                />
                <label className="cs_checkbox_label" htmlFor={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              </div>
              <div className="cs_height_42 cs_height_xl_25" />
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-4">
        <label className="cs_input_label cs_heading_color">Gender</label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="gender"
              id="maleGender"
              defaultValue="male"
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
              defaultValue="female"
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
      <div className="col-lg-8">
        <label className="cs_input_label cs_heading_color">
          Any Degrees you want to show?
        </label>
        {formData.doctorDegrees.map((degree, index) => (
          <div key={index} className="space-y-2 flex flex-col items-end">
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={degree.institution}
              onChange={(e) => handleDegreeChange(index, e)}
              required
              className="cs_form_field"
            />
            <input
              type="text"
              name="description"
              placeholder="Degree Description"
              value={degree.description}
              onChange={(e) => handleDegreeChange(index, e)}
              required
              className="cs_form_field"
            />
          </div>
        ))}
      </div>
      <div className="col-lg-4">
        <button
          type="button"
          onClick={handleAddDegree}
          className="cs_btn cs_style_1"
        >
          <span>Add Another Degree</span>
        </button>
      </div>
      <div className="col-lg-8">
        <label className="cs_input_label cs_heading_color">
          Do you have any prior experiences in medical field?
        </label>
        {formData.doctorExperience.map((experience, index) => (
          <div key={index} className="space-y-2 flex items-center gap-2">
            <textarea
              type="text"
              name="doctorExperience"
              placeholder="Enter Experience"
              value={experience}
              onChange={(e) => handleExperienceChange(index, e)}
              required
              className="cs_form_field"
            />
          </div>
        ))}
      </div>
      <div className="col-lg-4">
        <button
          type="button"
          onClick={handleAddExperience}
          className="cs_btn cs_style_1"
        >
          <span>Add Another Experience</span>
        </button>
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          Write about yourself
        </label>
        <textarea
          name="doctorDescription"
          placeholder="Description"
          value={formData.doctorDescription}
          onChange={handleChange}
          required
          className="cs_form_field"
        />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Choose an image
        </label>
        <input
          type="file"
          className="cs_form_field"
          accept="images/*"
          onChange={handleFileChange}
        />
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
