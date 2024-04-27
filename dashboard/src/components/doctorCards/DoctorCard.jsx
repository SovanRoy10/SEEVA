import { Link } from "react-router-dom";

export default function DoctorCard() {
  return (
    <Link to="/users/1">
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[17vw] cursor-pointer">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl">
          <img
            src="https://docs.material-tailwind.com/img/team-3.jpg"
            alt="profile-picture"
            className=""
          /> 
        </div>
        <div className="p-6 text-center">
          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Natalie Paisley
          </h4>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400 text-gray-500">
            CEO / Co-Founder
          </p>
        </div>
      </div>
    </Link>
  );
}
