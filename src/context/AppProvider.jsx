import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  // const [token, setToken] = useState("");
  const [currUser, setCurrUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  // This functino will run obly once and get all user data when the page is refreshed or cloesd or open before cookie expires
  async function verifyUser() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.get(`${BASE_URL}/user/verify_user`, {
        withCredentials: true,
      });

      if (response.data.status) {
        setIsLoggedIn(true);
        setCurrUser({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          phone: response.data.user.phone,
          email: response.data.user.email,
        });
      }
    } catch (error) {
      // console.log(error.message, "Unable to fetch the logged in user info");
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  // logout api call

  async function logout() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.data.status) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error.message, "Unable to Logout");
    }
  }

  // set room availiabilty function

  async function setRoomAvailability(id, statusToUpdate) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.post(
        `${BASE_URL}/user/update_room_status`,
        {
          id,
          statusToUpdate,
        },
        { withCredentials: true }
      );

      console.log(response);
    } catch (error) {
      console.log(error.message, "Unable to set Room Availability");
    }
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        sideBarOpen,
        setSideBarOpen,
        currUser,
        setCurrUser,
        logout,
        setRoomAvailability,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
