import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Navigate } from "react-router-dom";

export default function HiddenRoutes({ children }) {
  const { isLoggedIn } = useContext(AppContext);
  return !isLoggedIn ? children : <Navigate to="/" />;
}
