import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getAllAdmins = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/admins",
        {
          withCredentials: true,
        }
      );
      setAdmins(response.data.admins);
    };
    getAllAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/user/${id}`,
        { withCredentials: true }
      );

      const updatedAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(updatedAdmins);

      toast.success("The admin deleted successfully");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Cannot delete the admin!");
    }
  };

  //   console.log(admins);
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-bold">All Admins</p>
        <Link to={"/admins/add"} className="bg-blue-600 px-5 py-1 rounded-lg">
          Add new
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {admins &&
          admins.map((admin) => {
            return (
              <div
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[17vw] cursor-pointer"
                key={admin._id}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl">
                  <img
                    src={admin.profileImageUrl}
                    alt="profile-picture"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 break-words">
                    {admin.name}
                  </h4>
                  <p className="block text-xs font-sans  antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400 text-gray-500 break-words">
                    {admin.email}
                  </p>
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400 break-words">
                    {admin.phone}
                  </p>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-200 p-2 rounded-full mt-2"
                  >
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
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
