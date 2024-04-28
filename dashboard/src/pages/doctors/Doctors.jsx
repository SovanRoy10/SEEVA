import { Link } from "react-router-dom";
import DoctorCard from "../../components/doctorCards/DoctorCard";

export default function Users() {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <p>Doctors</p>
        <Link
          to={"/doctors/add"}
          className="bg-blue-600 px-5 py-1 rounded-lg"
        >
          Add new
        </Link>
      </div>
      <div className={`grid grid-cols-4 gap-5`}>
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </div>
    </div>
  );
}
