import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  CircleArrowLeft,
  CircleArrowRight,
  LogOut,
  UserPen,
  MapPinHouse,
  ReceiptIndianRupee,
  Settings,
  UserRoundPlus,
  HousePlus,
  UserRoundCog,
} from "lucide-react";
import { AppContext } from "../../context/AppProvider";
import AssignRoom from "../../screens/AssignRoom";

export default function Sidebar() {
  const { sideBarOpen, setSideBarOpen, currUser, logout } =
    useContext(AppContext);
  return (
    <div
      className={`h-full  pt-10 bg-[var(--navbar)] rounded-2xl ps-2 pe-2 relative transition-[width] ease-in-out ${
        sideBarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="profile-section relative">
        <div className="flex justify-center items-center">
          <img
            className={` rounded-[50%] object-cover object-center border-double border-4 border-[var(--lightbg)] mb-4 ${
              sideBarOpen ? "w-32 h-32" : "w-16 h-16"
            }`}
            src="pp.jpg"
            alt=""
          />
        </div>

        <div className="Description mb-2 mt-1">
          <p className="text-white uppercase font-bold text-center underline">
            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                sideBarOpen
                  ? "max-w-xs opacity-100"
                  : "max-w-0 opacity-0 hidden"
              }`}
            >
              {`${currUser.firstname} ${currUser.lastname}`}
            </span>
          </p>
        </div>

        <div className="border-b-1 border-[var(--lightbg)] flex flex-col justify-start items-start pb-5">
          <button
            onClick={logout}
            className={`cursor-pointer w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex ${
              sideBarOpen ? "ps-5 gap-2" : "justify-center ps-1"
            } `}
          >
            <LogOut />
            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
          <Link
            to="/profile"
            className={`cursor-pointer  w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex ${
              sideBarOpen ? "ps-5 gap-2" : "justify-center ps-1"
            } `}
          >
            <UserPen />
            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>
      <div className="menu mt-5 flex flex-col justify-start items-start">
        <Link
          to="/add_property"
          className={`w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex ${
            sideBarOpen ? "ps-5 gap-2" : "justify-center ps-1"
          } `}
        >
          <MapPinHouse />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Add Property
          </span>
        </Link>
        <Link
          to="/add_rooms"
          className={`w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex ${
            sideBarOpen ? "ps-5 gap-2" : "justify-center ps-1"
          }`}
        >
          <HousePlus />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Add Rooms
          </span>
        </Link>
        <Link
          to="/add_tenant"
          className={`w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex ${
            sideBarOpen ? "ps-5 gap-2" : "justify-center ps-1"
          }`}
        >
          <UserRoundPlus />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Add Tenant
          </span>
        </Link>
        <Link
          to="/assign_room"
          className={`w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex  gap-2 ${
            sideBarOpen ? "ps-5 gap-2" : "justify-center ps-2"
          }`}
        >
          <UserRoundCog />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Assign Room
          </span>
        </Link>
        <Link
          to="/bill_calculator"
          className={`w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex ${
            sideBarOpen ? "ps-5 gap-2" : "justify-center ps-0.5"
          }`}
        >
          <ReceiptIndianRupee />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Ebill Calculator
          </span>
        </Link>
        <Link
          className={`w-full text-center pt-2 pb-2 mb-1 bg-[var(--primary)] rounded-2xl hover:bg-[var(--surface)] flex  gap-2 ${
            sideBarOpen ? "ps-5 gap-2" : "justify-center ps-2"
          }`}
        >
          <Settings />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
              sideBarOpen ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Management
          </span>
        </Link>

        {sideBarOpen ? (
          <div className="w-full flex justify-center items-center mt-2">
            <CircleArrowLeft
              onClick={() => setSideBarOpen((prev) => !prev)}
              className="w-8 h-8  cursor-pointer"
            />
          </div>
        ) : (
          <div className="w-full flex justify-center items-center mt-2">
            <CircleArrowRight
              onClick={() => setSideBarOpen((prev) => !prev)}
              className="w-8 h-8  cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
// adjustment notes for future referenbce
// the span inside biutton s and links ensure that they are hiddent when sidebar container closes
// the problem for above solution i face was the sibar container was animat4ed to width 0 on sidebar close. bbut the sidebar component inside the container was still showing te4xts
