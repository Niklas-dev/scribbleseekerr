import { PoppinsBold } from "@/styles/fonts";
import React from "react";
import LottiePlayer from "./LottiePlayer";

export default function ReportCreated() {
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full grid items-center">
      <div className="flex flex-col justify-center items-center">
        <LottiePlayer
          src="https://assets10.lottiefiles.com/packages/lf20_h4th9ofg.json"
          classes="w-[400px] h-[400px] mt-8"
          autoplay
          loop={false}
        />
        <h3
          className={`${PoppinsBold.className} text-gray-100 text-xl text-center`}
        >
          Report has been created.
        </h3>
      </div>
    </div>
  );
}
