import React from "react";

export default function Toast({ message }) {
  return (
    <div className="w-full h-dvh absolute top-0 left-0 bg-black/60">
      <div className="w-full bg-[var(--surface)] absolute h-32 flex justify-center items-center top-50  left-0">
        <h1 className="text-white text-2xl w-full text-center">{message}</h1>
      </div>
    </div>
  );
}
