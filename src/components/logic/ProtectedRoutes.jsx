import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useContext(AppContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
