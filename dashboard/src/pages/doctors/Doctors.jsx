import { Link } from "react-router-dom";
import DoctorCard from "../../components/doctorCards/DoctorCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllDoctors = async () => {
      setLoading(true);
      const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors` , {
        withCredentials: true,
      });

      setDoctors((await response).data.doctors);
      setLoading(false);
    };
    getAllDoctors();
  }, []);

  // console.log(doctors)
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-bold">Doctors</p>
        <Link to={"/doctors/add"} className="bg-blue-600 px-5 py-1 rounded-lg">
          Add new
        </Link>
      </div>
      {!loading && (
        <div className={`grid grid-cols-4 gap-5`}>
          {doctors.map((doctor, index) => {
            return <DoctorCard doctor={doctor} key={doctor._id} />;
          })}
          {!doctors && <p>No doctor available 😔</p>}
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}
