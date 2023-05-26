import React from "react";
import LottiePlayer from "./LottiePlayer";
import { PoppinsBold } from "@/styles/fonts";

export default function PostHasBeenCreatedInfo() {
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full grid items-center">
      <div className="flex flex-col justify-center items-center">
        <LottiePlayer
          src="https://assets9.lottiefiles.com/private_files/lf30_nsqfzxxx.json"
          classes="w-[400px] h-[400px] mt-8"
          autoplay
          loop={false}
        />
        <h3
          className={`${PoppinsBold.className} text-gray-100 text-xl text-center`}
        >
          Post has been created.
        </h3>
      </div>
    </div>
  );
}
