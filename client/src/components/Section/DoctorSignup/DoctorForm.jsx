import { Icon } from "@iconify/react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { councils, departments, weekdays } from "../../data";

export default function SignupForm() {
  return (
    <form action="#" className="row">
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Name</label>
        <input type="text" className="cs_form_field" placeholder="Sovan Roy" />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Phone Number</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="(123) 456 - 789"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>

      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Date of Birth</label>

        <div className="cs_with_icon_input">
          <DatePicker
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
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Registration Number
        </label>
        <input
          type="number"
          className="cs_form_field"
          placeholder="12345-6789"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">
          Year of Registration
        </label>
        <input
          type="number"
          className="cs_form_field"
          placeholder="Dr Rupal Paul"
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
          name="EndTime"
          id="EndTime"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-7 mb-4">
        <label className="cs_input_label cs_heading_color">Council</label>
        <select className="cs_form_field" name="smcId" id="smcId">
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
        <input type="number" className="cs_form_field" placeholder="500" />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6 mb-4">
        <label className="cs_input_label cs_heading_color">Department</label>
        <select className="cs_form_field" name="smcId" id="smcId">
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
