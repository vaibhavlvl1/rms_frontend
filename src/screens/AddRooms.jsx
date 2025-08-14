import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../components/ui/Toast";
import axios from "axios";

export default function AddRooms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  const [properties, setProperties] = useState(null);

  //   get property list

  async function getProperties() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${BASE_URL}/user/get_properties`, {
        withCredentials: true,
      });

      console.log(response);
      if (response.data.status) {
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.log(error.message, "unable to fetch property list");
    }
  }
  // fetch properties as soon as the component mounts
  useEffect(() => {
    getProperties();
  }, []);

  // main  handle submit function
  const onSubmit = async (data) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/user/add_room`,
        {
          property_id: data.property_id,
          room_type: data.room_type,
          floor: data.floor,
          rent_amount: data.rent_amount,
          room_name: data.room_name,
        },
        { withCredentials: true }
      );

      if (response.data.status) {
        setToast(true);
      }
    } catch (error) {
      console.log(error.message, "unable to add room");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setToast(false);
      }, 3000);
      reset();
    }
  };

  return (
    <>
      {/* toast message to convey successfull submitssion of form */}
      {toast && <Toast message={"Room created"} />}
      <h1 className="text-2xl text-white bg-[var(--navbar)] ps-5 pt-2 pb-2 rounded-2xl text-center">
        Add Rooms
      </h1>
      <section className="h-full w-full flex justify-center items-center">
        <form
          className="w-full md:w-1/2 flex flex-col    text-black p-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="property_id" className="text-white mb-1">
            Select Property
          </label>
          <select
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="property_id"
            {...register("property_id", { required: true })}
          >
            <option defaultChecked value="property1">
              Select Property
            </option>

            {/* api property list */}

            {properties &&
              properties.map((property) => (
                <option value={property.property_id}>{property.name}</option>
              ))}
          </select>

          <label htmlFor="room_type" className="text-white mb-1">
            Enter a Number / Name for room
          </label>
          <input
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="room_type"
            type="text"
            placeholder="floor-no-name-etc"
            {...register("room_name", { required: true })}
          />

          <label htmlFor="room_type" className="text-white mb-1">
            Room Type
          </label>
          <input
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="room_type"
            type="text"
            placeholder="RK/BHK/2BHK"
            {...register("room_type", { required: true })}
          />
          <label htmlFor="floor" className="text-white mb-1">
            Enter Floor
          </label>
          <input
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="floor"
            type="number"
            placeholder="3/4/21 etc"
            {...register("floor", { required: true })}
          />

          <label htmlFor="rent_amount" className="text-white mb-1">
            Rent Amount
          </label>
          <input
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            id="rent_amount"
            type="number"
            {...register("rent_amount", { required: true })}
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
