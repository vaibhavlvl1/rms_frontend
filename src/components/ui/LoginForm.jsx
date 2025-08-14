import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";

export default function LoginForm({ setIsUser }) {
  // getting token from context

  const { setIsLoggedIn, setCurrUser } = useContext(AppContext);

  // state to get all form errors to be populated in api calls
  const [formErrors, setFormErrors] = useState({
    emailNotFound: false,
    wrongPassword: false,
  });

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [loginLoading, setLoginLoading] = useState(false);

  async function handleSubmit(e) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    e.preventDefault();

    try {
      setLoginLoading(true);
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        {
          email: formInput.email,
          password: formInput.password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.status) {
        setIsLoggedIn(true);
        setCurrUser({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          email: response.data.user.email,
          phone: response.data.user.phone,
        });
      }
    } catch (error) {
      // error for user name

      if (error.response.data.message === "Email Doesn't Exist") {
        setFormErrors((prev) => ({ ...prev, emailNotFound: true }));

        setTimeout(() => {
          setFormErrors((prev) => ({ ...prev, emailNotFound: false }));
        }, 3000);
      } else if (error.response.data.message === "Passwords Do Not Match") {
        setFormErrors((prev) => ({ ...prev, wrongPassword: true }));

        setTimeout(() => {
          setFormErrors((prev) => ({ ...prev, wrongPassword: false }));
        }, 3000);
      }
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <form
      className="bg-[var(--muted)]/50 w-full h-full p-5 "
      onSubmit={(e) => handleSubmit(e)}
      method="POST"
    >
      <div className=" w-full mb-5">
        <label className="text-[var(--lightbg)]" htmlFor="username">
          Enter Registered Email ID
        </label>
        <input
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, email: e.target.value }))
          }
          id="username"
          name="username"
          className="w-full bg-transparent border-b-2 border-[var(--border)] outline-0 p-1 text-[var(--lightbg)]"
          type="email"
          required
        />

        {formErrors.emailNotFound && (
          <p className="text-red-600">Email Doesnt Exist. Please Register</p>
        )}
      </div>
      <div className="w-full mb-5">
        <label className="text-[var(--lightbg)]" htmlFor="password">
          Enter Password
        </label>
        <input
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, password: e.target.value }))
          }
          id="password"
          name="password"
          className="w-full border-b-2 border-[var(--border)]  outline-0 p-1 text-white"
          type="password"
          autoComplete="current-password"
          required
        />
        {formErrors.wrongPassword && (
          <p className="text-red-600">Password is Wrong.</p>
        )}
      </div>
      <h1 className="text-center">
        <button
          className=" text-[var(--border)]  transition-colors  rounded-l pt-1 pb-1 pl-4 pr-4 cursor-pointer bg-[var(--primary)] hover:bg-[var(--navbar)] hover:text-white"
          type="submit"
        >
          LOGIN
        </button>
      </h1>
    </form>
  );
}
