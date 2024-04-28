import { Link } from "react-router-dom";

export default function DoctorCard(props) {
  return (
    <Link to={`/doctors/${props.doctor._id}`}>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[17vw] cursor-pointer">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl">
          <img
            src={props.doctor.profileImageUrl}
            alt="profile-picture"
            className="w-full"
          /> 
        </div>
        <div className="p-6 text-center">
          <h4 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
           {props.doctor.name}
          </h4>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400 text-gray-500">
            {props.doctor.doctorDepartment}
          </p>
        </div>
      </div>
    </Link>
  );
}
