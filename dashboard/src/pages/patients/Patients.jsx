import { fakePatients } from "../../data";

export default function Patients() {
  return (
    <div>
      <p className="text-2xl font-bold">Patients</p>

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
            {fakePatients.map((Patient, index) => {
              return (
                <tr className="bg-white border-b">
                  <td className="py-4 px-6"> {Patient.id}</td>
                  <td className="py-4 px-6">{Patient.name}</td>
                  <td className="py-4 px-6">{Patient.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
