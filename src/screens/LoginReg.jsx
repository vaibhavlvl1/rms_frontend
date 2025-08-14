import React, { useState } from "react";
import LoginForm from "../components/ui/LoginForm";
import RegForm from "../components/ui/RegForm";

export default function LoginReg() {
  const [isUser, setIsUser] = useState(true);

  return (
    <div className="w-full bg-[var(--primary)] relative h-dvh grid place-items-center z-10">
      <video
        src="bgVideo.mp4"
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 w-full h-full z-10 object-cover"
      ></video>
      <div className=" w-11/12 lg:w-lg h-auto   shadow-xl/50 z-20 ">
        <h6 className="text-xl text-center bg-[var(--surface)]/70 pt-5 pb-5 text-[var(--lightbg)] rounded-t-xl">
          Welcome to Rent Management System 1.0
        </h6>

        {isUser ? (
          <LoginForm setIsUser={setIsUser} />
        ) : (
          <RegForm setIsUser={setIsUser} />
        )}

        <div className="p-5 mt-2 bg-[var(--surface)] text-[var(--border)] rounded-b-xl ">
          <p>
            Dont Have an Account ?{" "}
            <button
              onClick={() => setIsUser((prev) => !prev)}
              className="underline cursor-pointer text-white"
            >
              {!isUser === false ? "Signup" : "Login"}
            </button>{" "}
            Here Now
          </p>
          <a href="#" className="underline text-white">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
}
