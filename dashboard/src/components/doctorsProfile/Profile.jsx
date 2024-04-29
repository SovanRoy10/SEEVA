import { useState, useEffect } from "react";
import AddDoctor from "../addDoctorForm/DoctorForm";
import { weekdays, addDoctorFieldsUpdate, getCouncil } from "../../data";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  let { id } = useParams();

  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/user/doctors/${id}`,
          { withCredentials: true }
        );
        setDoctor(response.data.user);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchDoctor();
  }, []);

  // console.log(typeof doctor.smcId)

  const [selectedItem, setSelectedItem] = useState("Overview");
  const handleSelectedItem = (content) => {
    setSelectedItem(content);
  };

  let content = "";
  if (selectedItem === "Overview") {
    content = (
      <div className="overflow-x-auto relative shadow-md rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Property
              </th>
              <th scope="col" className="py-3 px-6">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 border-b ">
              <td className="py-4 px-6">Doctor Department</td>
              <td className="py-4 px-6">{doctor?.doctorDepartment}</td>
            </tr>
            <tr className="bg-gray-300 ">
              <td className="py-4 px-6">Registration Number</td>
              <td className="py-4 px-6">{doctor?.registrationNumber}</td>
            </tr>
            <tr className="bg-gray-100 ">
              <td className="py-4 px-6">Year</td>
              <td className="py-4 px-6">{doctor?.year}</td>
            </tr>
            <tr className="bg-gray-300 ">
              <td className="py-4 px-6">Council</td>
              <td className="py-4 px-6">{getCouncil(doctor?.smcId)?.name}</td>
            </tr>
            <tr className="bg-gray-100 ">
              <td className="py-4 px-6">Fee Per Consultation</td>
              <td className="py-4 px-6">{doctor?.feePerConsultation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else if (selectedItem === "TimeTable") {
    content = (
      <div className="overflow-x-auto relative mt-10 flex gap-5">
        <table className="w-1/2 text-sm text-left text-gray-700  rounded-lg shadow-md">
          <tbody>
            {weekdays.map((val, index) => {
              return (
                <tr
                  className={`border-white border-b-[2px] bg-gray-${
                    index % 2 === 0 ? "300" : "100"
                  } ${doctor[val] ? "bg-green-300" : "bg-red-300"}`}
                  key={val}
                >
                  <td className="py-4 px-6 font-bold flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {console.log(doctor.monday)}
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </td>
                  <td className="py-4 px-6">
                    Time : <span className="text-blue-600">8:00 - 12:00</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col w-1/4 gap-5 items-center text-slate-800">
          <div className="bg-blue-200 w-fit p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
          </div>
          <p className="text-xl font-bold">Phone</p>
          <p className="text-sm text-center">
            Great doctor if you need your family member to get effective
            immediate assistance
          </p>
          <p className="text-blue-600">+91 {doctor.phone}</p>
        </div>
        <div className="flex flex-col w-1/4 gap-5 items-center text-slate-800">
          <div className="bg-blue-200 w-fit p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <p className="text-xl font-bold">Email</p>
          <p className="text-sm text-center">
            Great doctor if you need your family member to get effective
            immediate assistance
          </p>
          <p className="text-blue-600">{doctor.email}</p>
        </div>
      </div>
    );
  } else if (selectedItem === "Settings") {
    content = (
      <AddDoctor
        doctor={doctor}
        name="Settings"
        button1="Update"
        button2="Delete"
        fields={addDoctorFieldsUpdate}
      />
    );
  }

  return (
    <div>
      <h2 className="mb-5">Doctor Profile & Settings</h2>

      <div className="bg-slate-100 rounded-xl min-h-screen">
        <div className="h-40 relative flex flex-col justify-center w-full">
          <div className="bg-blue-600 h-1/2 rounded-t-xl w-full"></div>
          <div className="h-1/2 w-full"></div>
          <div className="absolute ml-5 flex items-center">
            <img
              src={doctor.profileImageUrl}
              alt="doctor-profile"
              className="w-[100px] rounded-full"
            />
            <div className="ml-3">
              <p>{doctor.name}</p>
              <p className="text-black">{doctor.doctorDepartment}</p>
            </div>
          </div>
        </div>

        <div className="details px-5 pb-5">
          <div className="buttons mt-5 flex justify-between">
            <button
              onClick={() => handleSelectedItem("Overview")}
              className="bg-blue-600 px-10 py-2 rounded-lg"
            >
              Overview
            </button>
            <button
              onClick={() => handleSelectedItem("TimeTable")}
              className="bg-blue-600 px-10 py-2 rounded-lg"
            >
              Time Table
            </button>
            <button
              onClick={() => handleSelectedItem("Settings")}
              className="bg-blue-600 px-10 py-2 rounded-lg"
            >
              Settings
            </button>
          </div>

          {content}
        </div>
      </div>
    </div>
  );
}
