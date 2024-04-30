import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const handleChangeStatus = async (e, id) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) => {
            return appointment._id === id
              ? { ...appointment, status: newStatus }
              : appointment;
          })
        );
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status: " + response.data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/appointment/getAll",
          { withCredentials: true }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make a delete request to the server
      await axios.delete(
        `http://localhost:4000/api/v1/appointment/delete/${id}`,
        { withCredentials: true }
      );

      // Remove the deleted appointment from the state
      const updatedAppointments = appointments.filter(
        (appointment) => appointment._id !== id
      );
      setAppointments(updatedAppointments);

      toast.success("Appointment deleted successfully");
    } catch (error) {
      console.error("Failed to delete the appointment:", error);
      toast.error("Failed to delete the appointment");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        {appointments.length === 0 && (
          <div className="text-2xl font-bold">No Appointments 😔</div>
        )}
        {appointments.length > 0 && (
          <p className="text-2xl font-bold">Appointments</p>
        )}
        <Link
          to={"/appointments/add"}
          className="bg-blue-600 px-5 py-1 rounded-lg"
        >
          Add new
        </Link>
      </div>

      {appointments.length > 0 && (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-w-6xl">
          <table className="text-sm text-left text-black">
            <thead className="text-xs text-gray-800 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Id
                </th>
                <th scope="col" className="py-3 px-6">
                  First Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>
                <th scope="col" className="py-3 px-6">
                  DOB
                </th>
                <th scope="col" className="py-3 px-6">
                  Gender
                </th>
                <th scope="col" className="py-3 px-6">
                  Appointment Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Department
                </th>
                <th scope="col" className="py-3 px-6">
                  Doctor Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Address
                </th>
                <th scope="col" className="py-3 px-6">
                  Visited
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{appointment.firstName}</td>
                    <td className="py-4 px-6">{appointment.lastName}</td>
                    <td className="py-4 px-6">{appointment.email}</td>
                    <td className="py-4 px-6">{appointment.phone}</td>
                    <td className="py-4 px-6">
                      {new Date(appointment.dob).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">{appointment.gender}</td>
                    <td className="py-4 px-6">
                      {new Date(
                        appointment.appointmentDateTime
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">{appointment.department}</td>
                    <td className="py-4 px-6">{appointment.doctor.name}</td>
                    <td className="py-4 px-6">{appointment.address}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.hasVisited
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.hasVisited ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className={`py-4 px-6`}>
                      <select
                        name="status"
                        className="border-gray-300 border-2 px-2 py-1"
                        value={appointment.status}
                        onChange={(e) => handleChangeStatus(e, appointment._id)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <button onClick={() => handleDelete(appointment._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-red-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
