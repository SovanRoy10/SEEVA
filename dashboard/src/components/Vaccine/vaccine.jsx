import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

export default function Vaccines() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/vaccine/bookings`,
          { withCredentials: true }
        );
        const fetchedBookings = response.data.bookings;

        const updatedBookings = await Promise.all(
          fetchedBookings.map(async (booking) => {
            const { lat, lng } = booking;
            if (lat && lng) {
              try {
                const response = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
                    import.meta.env.VITE_GOOGLE_MAP_API
                  }`
                );
                if (response.data.results.length > 0) {
                  return {
                    ...booking,
                    address: response.data.results[0].formatted_address,
                  };
                } else {
                  return { ...booking, address: "No address found" };
                }
              } catch (error) {
                console.error("Error fetching the address", error);
                return { ...booking, address: "Error fetching the address" };
              }
            } else {
              return booking;
            }
          })
        );

        setBookings(updatedBookings);
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error(error.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="text-2xl font-bold">Bookings</p>
      </div>

      {!loading && (
        <div>
          {bookings.length === 0 && (
            <div className="text-2xl font-bold">No Bookings 😔</div>
          )}
          {bookings.length > 0 && (
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-w-6xl">
              <table className="text-sm text-left text-black">
                <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Id
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Age
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Gender
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Phone
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Aadhar Number
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Vaccination Address
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Vaccine
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => {
                    return (
                      <tr className="bg-white border-b" key={index}>
                        <td className="py-4 px-6">{booking._id}</td>
                        <td className="py-4 px-6">{booking.name}</td>
                        <td className="py-4 px-6">{booking.age}</td>
                        <td className="py-4 px-6">{booking.gender}</td>
                        <td className="py-4 px-6">{booking.phoneNumber}</td>
                        <td className="py-4 px-6">{booking.aadharNumber}</td>
                        <td className="py-4 px-6">{booking.address}</td>
                        <td className="py-4 px-6">{booking.vaccine}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {loading && <Loader />}
    </div>
  );
}
