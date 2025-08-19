import React, { useState } from "react";
import Toast from "../components/ui/Toast";

export default function BillCalculator() {
  const [toast, setToast] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [readings, setReadings] = useState({
    prevMonth: 0,
    currMonth: 0,
  });

  const [submeterReadings, setSubmeterReadings] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted");
    setSubmeterReadings(readings.currMonth - readings.prevMonth);
  }
  return (
    <>
      {/* toast message to convey successfull submitssion of form */}
      {toast && <Toast message={"Room Assigned Successfully"} />}
      <h1 className="text-2xl text-white bg-[var(--navbar)] ps-5 pt-2 pb-2 rounded-2xl text-center">
        Bill Calculator
      </h1>
      <section className=" h-full w-full flex justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full md:w-1/2 flex flex-col    text-black p-1"
        >
          <div className="mb-2">
            <label htmlFor="tenant" className="text-white mb-1">
              Select Tenant
            </label>
            <select
              name="tenant"
              id="tenant"
              className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            >
              <option value="">Select Tenant</option>
            </select>
          </div>
          <div className="text-white mb-1">
            <p>Enter Meter Readings</p>
            <div className=" sm:columns-2 flex flex-wrap sm:flex-nowrap gap-5">
              <input
                onChange={(e) =>
                  setReadings({ ...readings, prevMonth: e.target.value })
                }
                type="number"
                placeholder="Prev Reading"
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
              />
              <input
                onChange={(e) =>
                  setReadings({ ...readings, currMonth: e.target.value })
                }
                type="number"
                placeholder="Current Reading"
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
              />
            </div>
            <p>Submeter Units Are {readings.currMonth - readings.prevMonth}</p>
          </div>
          <button>Submit</button>
        </form>
        <button onClick={() => console.log(submeterReadings)}>Logger</button>
      </section>
    </>
  );
}
