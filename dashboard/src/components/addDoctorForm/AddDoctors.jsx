import DoctorForm from "./DoctorForm.jsx";
import { addDoctorFields } from "../../data";

export default function AddDoctors() {
  return (
    <div>
      <p className="text-2xl font-bold">Add New Doctor</p>
      <DoctorForm
        name="Add"
        button1="Submit"
        button2="Cancel"
        fields={addDoctorFields}
      />
    </div>
  );
}
