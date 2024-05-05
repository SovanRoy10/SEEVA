import { useState } from "react";
import { councils, weekdays } from "../../data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

function DoctorRegistrationForm(props) {
  // console.log(new Date(props.doctor.dob).toLocaleDateString())
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: props.doctor?.name || "",
    email: props.doctor?.email || "",
    phone: props.doctor?.phone || "",
    dob:
      (props.doctor &&
        new Date(props.doctor.dob).toISOString().split("T")[0]) ||
      "",
    gender: props.doctor?.gender || "",
    doctorDepartment: props.doctor?.doctorDepartment || "",
    registrationNumber: props.doctor?.registrationNumber || "",
    smcId: props.doctor?.smcId || "",
    year: props.doctor?.year || "",
    feePerConsultation: props.doctor?.feePerConsultation || "",
    status: props.doctor?.doctorStatus || "",
    startTime: props.doctor?.startTime || "",
    endTime: props.doctor?.endTime || "",
    monday: props.doctor?.monday || false,
    tuesday: props.doctor?.tuesday || false,
    wednesday: props.doctor?.wednesday || false,
    thursday: props.doctor?.thursday || false,
    friday: props.doctor?.friday || false,
    saturday: props.doctor?.saturday || false,
    sunday: props.doctor?.sunday || false,
    docAvatar: props.doctor?.profileImageUrl || null,
    doctorDegrees: props.doctor?.doctorDegrees || [
      { institution: "", description: "" },
    ],
    doctorExperience: props.doctor?.doctorExperience || [""],
    doctorDescription: props.doctor?.doctorDescription || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
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

  // console.log(props.doctor._id);

  const handleDegreeChange = (index, e) => {
    const updatedDegrees = [...formData.doctorDegrees];
    updatedDegrees[index][e.target.name] = e.target.value;
    setFormData({ ...formData, doctorDegrees: updatedDegrees });
  };

  const handleDegreeDelete = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      doctorDegrees: prevFormData.doctorDegrees.filter((_, i) => i != index),
    }));
  };

  const handleExperienceDelete = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      doctorExperience: prevFormData.doctorExperience.filter(
        (_, i) => i != index
      ),
    }));
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
    // console.log(formData.feePerConsultation)
    // console.log(formData);
    const data = new FormData();
    if (props.name === "Settings") {
      for (const key in formData) {
        if (
          key === "doctorDepartment" ||
          key === "email" ||
          key === "gender" ||
          key === "phone" ||
          key === "feePerConsultation" ||
          key === "startTime" ||
          key === "endTime" ||
          key === "monday" ||
          key === "tuesday" ||
          key === "wednesday" ||
          key === "thursday" ||
          key === "friday" ||
          key === "saturday" ||
          key === "sunday" ||
          key === "status" ||
          key === "docAvatar" ||
          key === "doctorDescription"
        ) {
          data.append(key, formData[key]);
        }
      }
      formData.doctorDegrees.forEach((degree, index) => {
        data.append(`doctorDegrees[${index}][institution]`, degree.institution);
        data.append(`doctorDegrees[${index}][description]`, degree.description);
      });
      formData.doctorExperience.forEach((experience, index) => {
        data.append(`doctorExperience[${index}]`, experience);
      });
    } else {
      for (const key in formData) {
        if (
          key !== "status" &&
          key !== "doctorDegrees" &&
          key !== "doctorExperience"
        ) {
          data.append(key, formData[key]);
        }
      }
      formData.doctorDegrees.forEach((degree, index) => {
        data.append(`doctorDegrees[${index}][institution]`, degree.institution);
        data.append(`doctorDegrees[${index}][description]`, degree.description);
      });
      formData.doctorExperience.forEach((experience, index) => {
        data.append(`doctorExperience[${index}]`, experience);
      });
    }

    // console.log(data);
    if (props.name === "Settings") {
      // for (let [key, value] of data.entries()) {
      //   console.log(key, value);
      // }
      try {
        setLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/update/${
            props.doctor._id
          }`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        toast.success("Doctor Profile Updated successfully!");
        navigate("/doctors");
      } catch (error) {
        console.error("Error:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to update doctor.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        // for (let [key, value] of data.entries()) {
        //   console.log(key, value);
        // }
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/addNew`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        toast.success("Doctor registered successfully!");
        navigate("/doctors");
      } catch (error) {
        console.error("Error:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to register doctor.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickButton2 = async () => {
    if (props.name === "Settings") {
      try {
        setLoading(true);
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${props.id}`,
          { withCredentials: true }
        );
        toast.success("Doctor Account Deleted Successfully!");
        navigate("/doctors");
      } catch (error) {
        const errorMessage = error.data?.message || error.message;
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/doctors");
    }
  };

  return (
    <>
      {!loading && (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 grid grid-cols-2 gap-4 text-slate-800"
        >
          {props.fields.map((val, index) => {
            return (
              <div
                className={`mb-4 ${
                  props.name !== "Settings" && index === 0 && "col-span-2"
                }`}
                key={index}
              >
                <label
                  htmlFor={val[1]}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {val[0]}
                </label>
                {val[2] === "select" ? (
                  <select
                    name={val[1]}
                    id={val[1]}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={formData[val[1]]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select {val[0]}</option>
                    {val[3].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={val[2] || "text"} // Defaults to "text" if type is not specified
                    name={val[1]}
                    id={val[1]}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData[val[1]]}
                    onChange={handleChange}
                    placeholder={val[0]}
                    required
                  />
                )}
              </div>
            );
          })}

          {props.name !== "Settings" && (
            <div className="mb-4">
              <label
                htmlFor="smcId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Council
              </label>
              <select
                name="smcId"
                id="smcId"
                className="block appearance-none w-full bg-white border border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={formData.smcId}
                onChange={handleChange}
                required
              >
                {councils.map((council) => (
                  <option key={council.id} value={council.id}>
                    {council.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Start Time:
            </label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.startTime}
              onChange={handleChange}
              placeholder="Start Time"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              End Time:
            </label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.endTime}
              onChange={handleChange}
              placeholder="End Time"
              required
            />
          </div>

          <div className="col-span-2 mb-4">
            <p className="my-3 font-bold"> Avalibility : </p>
            {weekdays.map((day) => (
              <div key={day} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={day}
                  id={day}
                  className="mr-2 leading-tight"
                  checked={formData[day]}
                  onChange={handleChange}
                />
                <label
                  htmlFor={day}
                  className="text-gray-700 text-sm font-bold"
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <div className="col-span-2 mb-4">
            <label
              htmlFor="docAvatar"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Doctor Image:
            </label>
            {props.doctor && (
              <img
                src={props.doctor.profileImageUrl}
                alt="profileImage"
                className="w-[150px] my-5 border border-black"
              />
            )}
            <input
              type="file"
              name="docAvatar"
              id="docAvatar"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
              required={props.id ? false : true}
            />
          </div>
          {formData.doctorDegrees.map((degree, index) => (
            <div key={index} className="space-y-2 flex flex-col items-end">
              <input
                type="text"
                name="institution"
                placeholder="Institution"
                value={degree.institution}
                onChange={(e) => handleDegreeChange(index, e)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="description"
                placeholder="Degree Description"
                value={degree.description}
                onChange={(e) => handleDegreeChange(index, e)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {props.name === "Settings" && (
                <button
                  className="bg-red-300 p-2 rounded-full hover:bg-red-400 w-fit"
                  type="button"
                  onClick={() => handleDegreeDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-4 h-4 text-red-600"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDegree}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-1/2 h-2/3"
          >
            Add Another Degree
          </button>
          {formData.doctorExperience.map((experience, index) => (
            <div key={index} className="space-y-2 flex items-center gap-2">
              <textarea
                type="text"
                name="doctorExperience"
                placeholder="Enter Experience"
                value={experience}
                onChange={(e) => handleExperienceChange(index, e)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {props.name === "Settings" && (
                <button
                  className="bg-red-300 p-2 rounded-full hover:bg-red-400 w-fit"
                  type="button"
                  onClick={() => handleExperienceDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-4 h-4 text-red-600"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExperience}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-1/2"
          >
            Add Another Experience
          </button>
          <textarea
            name="doctorDescription"
            placeholder="Description"
            value={formData.doctorDescription}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-2"
          />

          <div className="col-span-2 flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow"
            >
              {props.button1}
            </button>
            <button
              type="button"
              onClick={handleClickButton2}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow"
            >
              {props.button2}
            </button>
          </div>
        </form>
      )}

      {loading && <Loader />}
    </>
  );
}

export default DoctorRegistrationForm;
