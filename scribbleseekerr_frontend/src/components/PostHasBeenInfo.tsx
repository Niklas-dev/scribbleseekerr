import React from "react";
import LottiePlayer from "./LottiePlayer";
import { PoppinsBold } from "@/styles/fonts";

export default function PostHasBeenInfo({
  lottieSrc,
  text,
}: {
  lottieSrc: string;
  text: string;
}) {
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full grid items-center">
      <div className="flex flex-col justify-center items-center">
        <LottiePlayer
          src={lottieSrc}
          classes="w-[400px] h-[400px] mt-8"
          autoplay
          loop={false}
        />
        <h3
          className={`${PoppinsBold.className} text-gray-100 text-xl text-center`}
        >
          {text}
        </h3>
      </div>
    </div>
  );
}
