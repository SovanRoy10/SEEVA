import DoctorCard from "../../components/doctorCards/DoctorCard";

export default function Users() {
  return (
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
  );
}
