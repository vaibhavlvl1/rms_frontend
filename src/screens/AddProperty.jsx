import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toast from "../components/ui/Toast";
export default function AddProperty() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  // submit function
  const onSubmit = async (data) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${BASE_URL}/user/add_property`,
        {
          property_name: data.property_name,
          property_address: data.address,
          property_city: data.city,
          property_state: data.state,
        },
        { withCredentials: true }
      );
      console.log(response);

      if (response.data) {
        console.log("Property Created");
        setToast(true);
      }
    } catch (error) {
      console.log(error.message, "unabele to add property");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
    reset();
  };

  console.log(errors);
  return (
    <>
      {/* toast message to convey successfull submitssion of form */}
      {toast && <Toast message={"Property Added Successfully"} />}
      <h1 className="text-2xl text-white bg-[var(--navbar)] ps-5 pt-2 pb-2 rounded-2xl text-center">
        Add Properties
      </h1>
      <section className=" h-full w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2 flex flex-col    text-black p-1"
        >
          <label htmlFor="property_name" className="text-white mb-1">
            Enter Property Name
          </label>
          <input
            id="property_name"
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            type="text"
            {...register("property_name", { required: true })}
          />

          <label htmlFor="property_address" className="text-white mb-1">
            Property Address
          </label>
          <textarea
            id="property_address"
            className="border-b-2 text-black border-b-white p-2  w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl"
            {...register("address", { required: true })}
          />

          <label htmlFor="property_city" className="text-white mb-1">
            City
          </label>
          <input
            id="property_city"
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            type="text"
            {...register("city", { required: true })}
          />

          <label htmlFor="property_state" className="text-white mb-1">
            State
          </label>
          <input
            id="property_state"
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl"
            type="text"
            // placeholder="state"
            {...register("state", { required: true })}
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
