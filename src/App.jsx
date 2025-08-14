import { useContext } from "react";
import "./App.css";
import { AppContext } from "./context/AppProvider";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Layout from "./components/ui/Layout";
import ProtectedRoutes from "./components/logic/ProtectedRoutes";
import AddProperty from "./screens/AddProperty";
import AddTenant from "./screens/AddTenant";
import BillCalculator from "./screens/BillCalculator";
import PropertyManagement from "./screens/PropertyManagement";
import HiddenRoutes from "./components/logic/HiddenRoutes";
import LoginReg from "./screens/LoginReg";
import AddRooms from "./screens/AddRooms";
import AssignRoom from "./screens/AssignRoom";

function App() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <>
      <Routes>
        {/* user rputes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add_property" element={<AddProperty />} />
          <Route path="add_tenant" element={<AddTenant />} />
          <Route path="add_rooms" element={<AddRooms />} />
          <Route path="assign_room" element={<AssignRoom />} />
          <Route path="bill_calculator" element={<BillCalculator />} />
          <Route path="property_management" element={<PropertyManagement />} />
        </Route>
        <Route
          path="/login"
          element={
            <HiddenRoutes>
              <LoginReg />
            </HiddenRoutes>
          }
        />

        {/* tenants route */}
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
