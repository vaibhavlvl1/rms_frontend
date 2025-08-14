import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../components/ui/Toast";
import axios from "axios";

export default function AddTenant() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/user/add_tenant`,
        {
          fullname: data.fullname,
          phone: data.phone,
          id_proof_type: data.id_proof,
          id_proof_number: data.id_proof_number,
          permanent_address: data.permanent_address,
          job_title: data.job_title,
          company_name: data.company_name,
          residence_start: data.date_of_residence,
          residence_end: data.date_of_leaving,
        },
        { withCredentials: true }
      );
      if (response.data.status) {
        setToast(true);
      }
    } catch (error) {
      console.log(error.message, "An Error Occurred in adding tenant");
    } finally {
      console.log(data);
      setIsSubmitting(false);
      // reset();

      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
  };

  return (
    <>
      {" "}
      {/* toast message to convey successfull submitssion of form */}
      {toast && <Toast message={"Tenant Added Successfully"} />}
      <h1 className="text-2xl text-white bg-[var(--navbar)] ps-5 pt-2 pb-2 rounded-2xl text-center">
        Add Tenant
      </h1>
      <section className=" mt-5 h-full w-full flex justify-center items-center">
        <form
          className="w-full  flex flex-col mt-60 sm:mt-10   text-black p-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="fullname" className="text-white mb-1">
            Enter Full Name of Tenant
          </label>
          <input
            className="border-b-2 text-black border-b-white p-2 w-full lg:w-[30%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="fullname"
            type="text"
            placeholder="fullname"
            {...register("fullname", { required: true })}
          />
          <label htmlFor="phone" className="text-white mb-1">
            Mobile No.
          </label>
          <input
            className="border-b-2 text-black border-b-white p-2 w-full lg:w-[30%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="phone"
            type="tel"
            placeholder="phone"
            {...register("phone", { required: true })}
          />

          <div className="sm:columns-2">
            <div>
              <label className="text-white mb-1" htmlFor="jobTitle">
                Job Title
              </label>

              <input
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
                id="jobTitle"
                type="text"
                placeholder="job_title"
                {...register("job_title")}
              />
            </div>
            <div>
              <label className="text-white mb-1" htmlFor="company">
                Company
              </label>
              <input
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
                id="company"
                type="text"
                placeholder="company_name"
                {...register("company_name")}
              />
            </div>
          </div>

          <div className="sm:columns-2">
            <div>
              <label className="text-white mb-1" htmlFor="dateResidence">
                Date of Residence
              </label>
              <input
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
                id="dateResidence"
                type="date"
                placeholder="date_of_residence"
                {...register("date_of_residence")}
              />
            </div>

            <div>
              <label className="text-white mb-1" htmlFor="dateLeaving">
                Date of Leaving
              </label>
              <input
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
                id="dateLeaving"
                type="date"
                placeholder="date_of_leaving"
                {...register("date_of_leaving")}
              />
            </div>
          </div>
          <div className="sm:columns-2">
            <div>
              <label className="text-white mb-1" htmlFor="idProof">
                Enter ID Proof
              </label>
              <input
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
                id="idProof"
                type="text"
                placeholder="id_proof"
                {...register("id_proof")}
              />
            </div>

            <div>
              <label className="text-white mb-1" htmlFor="idProofNumber">
                Enter ID Proof No.
              </label>
              <input
                className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
                id="idProofNumber"
                type="text"
                placeholder="id_proof_number"
                {...register("id_proof_number")}
              />
            </div>
          </div>

          <label className="text-white mb-1" htmlFor="permanentAddress">
            Parmanent Address
          </label>
          <textarea
            className="border-b-2 text-black border-b-white p-2 w-full lg:w-[50%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="permanentAddress"
            type="text"
            placeholder="permanent_address"
            {...register("permanent_address")}
            rows="3"
          />

          <input
            className="bg-[var(--muted)] mt-5 hover:bg-[var(--border)] cursor-pointer text-white w-[100%] rounded-2xl p-2"
            type="submit"
          />
        </form>
      </section>
    </>
  );
}
