import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patients",
          { withCredentials: true }
        );
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    getAllPatients();
  }, []);

  // console.log(patients)

  return (
    <div>
      <p className="text-2xl font-bold">Patients</p>

      {!loading && (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs text-black uppercase bg-green-300">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((Patient, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <td className="py-4 px-6"> {index + 1}</td>
                    <td className="py-4 px-6 flex gap-5 items-center">
                      <img
                        src={Patient.profileImageUrl}
                        alt=""
                        className="w-10"
                      />
                      <p>{Patient.name}</p>
                    </td>
                    <td className="py-4 px-6">{Patient.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}
