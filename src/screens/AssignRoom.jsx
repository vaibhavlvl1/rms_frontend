import React from "react";
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import Toast from "../components/ui/Toast";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export default function AssignRoom() {
  // from context
  const { setRoomAvailability } = useContext(AppContext);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(false);
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [rooms, setRooms] = useState([]);

  //   get tenants

  async function getTenants() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.get(
        `${BASE_URL}/user/get_tenants`,

        {
          withCredentials: true,
        }
      );

      if (response.data.status) {
        setTenants(response.data.body);
      }
    } catch (error) {
      console.log(error.message, "Failed To Load Tenant List");
    }
  }

  //   get properties

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

  // get rooms
  async function getRooms() {
    rooms.length = 0;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.post(
        `${BASE_URL}/user/get_rooms`,
        { property_id: selectedProperty },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.status) {
        setRooms(response.data.rooms);
      }
    } catch (error) {
      console.log(error.message, "unable to fetch room ");
    }
  }

  // set room availability to false (0)

  // fetch properties as soon as the component mounts
  useEffect(() => {
    getProperties();
    getTenants();
  }, []);

  useEffect(() => {
    getRooms();
  }, [selectedProperty]);

  // submit function
  const onSubmit = async (data) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log(data);
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${BASE_URL}/user/assign_room`,
        {
          room_id: data.room_id,
          tenant_id: data.tenant_id,
          date_of_residence: data.date_of_residence,
        },
        { withCredentials: true }
      );
      console.log(response);

      if (response.data.status) {
        console.log("Room Assigned");
        setToast(true);
        setRoomAvailability(data.room_id, 0);
      }
    } catch (error) {
      console.log(error.message, "unable to assign room");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
    reset();
  };

  return (
    <>
      {/* toast message to convey successfull submitssion of form */}
      {toast && <Toast message={"Room Assigned Successfully"} />}
      <h1 className="text-2xl text-white bg-[var(--navbar)] ps-5 pt-2 pb-2 rounded-2xl text-center">
        Assign Rooms
      </h1>
      <section className=" h-full w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2 flex flex-col    text-black p-1"
        >
          <label htmlFor="tenant_name" className="text-white mb-1">
            Select Tenant
          </label>
          <select
            id="tenant_name"
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            type="text"
            {...register("tenant_id", { required: true })}
          >
            <option value="">Select Tenant</option>
            {tenants.map((tenant) => (
              <option value={tenant.tenant_id}>{tenant.full_name}</option>
            ))}
          </select>

          <label htmlFor="property_name" className="text-white mb-1">
            Select Property
          </label>
          <select
            id="property_name"
            className="border-b-2 text-black border-b-white p-2  w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl"
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
              <option value={property.property_id}>{property.name}</option>
            ))}
          </select>

          <label htmlFor="room_name" className="text-white mb-1">
            Select Room
          </label>
          <select
            id="room_name"
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl "
            type="text"
            {...register("room_id", { required: true })}
          >
            <option value="">Select Property First</option>

            {rooms.map((room) => (
              <option value={room.room_id}>{room.room_name}</option>
            ))}
          </select>

          <label htmlFor="select_date" className="text-white mb-1">
            Set Moving in Date
          </label>
          <input
            id="select_date"
            className="border-b-2 text-black border-b-white p-2 w-[100%] mb-2 bg-[var(--lightbg)] rounded-xl"
            type="date"
            // placeholder="state"
            {...register("date_of_residence", { required: true })}
          />

          <input
            className="bg-[var(--muted)] mt-5 hover:bg-[var(--border)] cursor-pointer text-white w-[100%] rounded-2xl p-2"
            type="submit"
          />
        </form>
        <button onClick={(e) => console.log(selectedProperty, rooms)}>
          logger
        </button>
      </section>
    </>
  );
}
