import { Link } from "react-router-dom";
import DoctorCard from "../../components/doctorCards/DoctorCard";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Users() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getAllDoctors = async () => {
      const response = axios.get("http://localhost:4000/api/v1/user/doctors", {
        withCredentials: true,
      });

      setDoctors((await response).data.doctors);
    };
    getAllDoctors();
  }, []);

  // console.log(doctors)
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p>Doctors</p>
        <Link to={"/doctors/add"} className="bg-blue-600 px-5 py-1 rounded-lg">
          Add new
        </Link>
      </div>
      <div className={`grid grid-cols-4 gap-5`}>
        {doctors.map((doctor, index) => {
          return <DoctorCard doctor={doctor} key={doctor._id} />;
        })}
      </div>
    </div>
  );
}
