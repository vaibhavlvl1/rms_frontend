import { EyeIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function RegForm({ setIsUser }) {
  // to navigate to login after submission
  const navigate = useNavigate();
  // state to display form errors
  const [formErrors, setFormErrors] = useState({
    emailExists: "",
    passwordError: true,
  });

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
  });

  // state to display toast messages
  const [toast, setToast] = useState(false);

  // state to check if passwords match
  const [verifyPass, setVerifyPass] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // state to change the visibility of password
  const [passType, setPassType] = useState("password");

  // function to check if password match or not;

  function passMatchChecker() {
    if (formInput.password === verifyPass) {
      setFormErrors((prev) => ({ ...prev, passwordError: false }));
    } else {
      setFormErrors((prev) => ({ ...prev, passwordError: true }));
    }
  }

  useEffect(() => {
    passMatchChecker();
  }, [verifyPass, formInput.password]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (formErrors.passwordError) {
      return;
    }

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        email: formInput.email,
        password: formInput.password,
        firstname: formInput.firstname,
        lastname: formInput.lastname,
        phone: formInput.phone,
      });

      if (response.data.status) {
        setToast(true);
        setTimeout(() => {
          setIsUser(true);
        }, 3000);
      }
      // console.log(response.data.message);
    } catch (error) {
      // to display the errors in form while filling and adding timers
      if (error.status === 409) {
        setFormErrors((prev) => ({
          ...prev,
          emailExists: "Email Already Registered",
        }));

        // the timer clears the red p tag ddenoting email exists error
        setTimeout(() => {
          setFormErrors((prev) => ({
            ...prev,
            emailExists: "",
          }));
        }, 3000);
      }

      console.log(error, "Unable to submit info");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        method="POST"
        className="bg-[var(--muted)]/50 w-full h-full p-5 relative"
      >
        <div className=" w-full mb-5 sm:columns-2">
          <div>
            <label className="text-[var(--lightbg)]" htmlFor="firstname">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) =>
                setFormInput((prev) => ({ ...prev, firstname: e.target.value }))
              }
              id="firstname"
              name="firstname"
              className="w-full border-b-2 border-[var(--border)] text-[var(--lightbg)] outline-0 p-1"
              type="text"
              required
            />
          </div>
          <div>
            <label className="text-[var(--lightbg)]" htmlFor="lastname">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) =>
                setFormInput((prev) => ({ ...prev, lastname: e.target.value }))
              }
              id="lastname"
              name="lastname"
              className="w-full border-b-2 border-[var(--border)] text-[var(--lightbg)] outline-0 p-1"
              type="text"
              required
            />
          </div>
        </div>
        <div className=" w-full mb-5">
          <label className="text-[var(--lightbg)]" htmlFor="phone">
            Enter Your Mobile No. <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) =>
              setFormInput((prev) => ({ ...prev, phone: e.target.value }))
            }
            id="phone"
            name="phone"
            className="w-full border-b-2 border-[var(--border)] text-[var(--lightbg)] outline-0 p-1"
            type="text"
            required
          />
        </div>
        <div className=" w-full mb-5">
          <label className="text-[var(--lightbg)]" htmlFor="username">
            Enter Your Email ID <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) =>
              setFormInput((prev) => ({ ...prev, email: e.target.value }))
            }
            id="username"
            name="username"
            className="w-full border-b-2 border-[var(--border)] text-[var(--lightbg)] outline-0 p-1"
            type="text"
            required
          />
        </div>
        {formErrors.emailExists && (
          <p className="text-red-600 mb-5">Email Already Registered</p>
        )}
        <div className="w-full mb-5">
          <label className="text-[var(--lightbg)]" htmlFor="password">
            Enter New Password <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              onChange={(e) =>
                setFormInput((prev) => ({ ...prev, password: e.target.value }))
              }
              id="password"
              name="password"
              className="w-full border-b-2 border-[var(--border)] outline-0 p-1 text-[var(--lightbg)]"
              type={passType}
              required
            />
            <EyeIcon
              onMouseOver={() => {
                setPassType("text");
              }}
              onMouseOut={() => {
                setPassType("password");
              }}
              className="text-[var(--primary)] w-7 absolute top-0 z-10 right-2 cursor-pointer hover:text-white"
            />
          </div>
        </div>
        <div className="w-full mb-5">
          <label className="text-[var(--lightbg)]" htmlFor="password">
            Confirm New Password <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) => setVerifyPass(e.target.value)}
            id="password"
            name="password"
            className="w-full border-b-2 border-[var(--border)] outline-0 p-1 text-[var(--lightbg)]"
            type="password"
            required
          />
        </div>
        {formErrors.passwordError && (
          <p className="text-red-700">Passwords do not match</p>
        )}

        <h1 className="text-center">
          <button
            className=" text-[var(--border)]  transition-colors  rounded-l pt-1 pb-1 pl-4 pr-4 cursor-pointer bg-[var(--primary)] hover:bg-[var(--navbar)] hover:text-white"
            type="submit"
          >
            SIGNUP
          </button>
        </h1>
      </form>
      {toast && (
        <Toast
          message={"User Registered Successfully... Redirecting to Login"}
        />
      )}
    </>
  );
}
