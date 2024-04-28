import { useState } from "react";
import { councils, weekdays } from "../../data";

function DoctorRegistrationForm(props) {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "Male",
    doctorDepartment: "",
    registrationNumber: "",
    smcId: "",
    year: "",
    feePerConsultation: "",
    startTime: "",
    endTime: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    docAvatar: null,
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
    setFormData({ ...formData, docAvatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "docAvatar" && formData[key]) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    // console.log(formData);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:4000/api/doctors/register",
    //     data,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   );
    //   console.log("Success:", response.data);
    //   alert("Doctor registered successfully!");
    // } catch (error) {
    //   console.error("Error:", error.response.data);
    //   alert("Failed to register doctor.");
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 grid grid-cols-2 gap-4 text-slate-800"
    >
      {props.fields.map((val, index) => {
        return (
          <div
            className={`mb-4 ${props.name==="Settings"&&index === 0 ? "col-span-2" : undefined}`}
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

      <div className="mb-4">
        <label
          htmlFor="year"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Year of Registration:
        </label>
        <input
          type="text"
          name="year"
          id="year"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year of Registration"
          required
        />
      </div>

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
            <label htmlFor={day} className="text-gray-700 text-sm font-bold">
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
          Doctor Avatar:
        </label>
        <input
          type="file"
          name="docAvatar"
          id="docAvatar"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
          required
        />
      </div>

      <div className="col-span-2 flex justify-between space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow"
        >
         {props.button1}
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-grow"
        >
          {props.button2}
        </button>
      </div>
    </form>
  );
}

export default DoctorRegistrationForm;
