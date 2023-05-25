"use client";
import LottiePlayer from "@/components/LottiePlayer";
import { PoppinsBold, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-center items-center max-w-screen overflow-x-hidden h-screen bg-[#0e0e0e]">
      <div className=" flex flex-col justify-center items-center w-full h-full">
        <LottiePlayer
          src="https://assets8.lottiefiles.com/packages/lf20_rz0hyab1.json"
          classes="w-[600px] h-[600px] mt-8"
          autoplay
          loop
        />
        <h1
          className={`${PoppinsBold.className} text-gray-100 text-xl text-center break-words `}
        >
          We landed in unknown terrain, we should go back.
        </h1>
        <button
          onClick={() => router.back()}
          className={`${PoppinsSemi.className} text-[#0e0e0e] mt-4 text-xl bg-gray-100 rounded-md px-6 grid items-center py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </button>
      </div>
    </div>
  );
}
