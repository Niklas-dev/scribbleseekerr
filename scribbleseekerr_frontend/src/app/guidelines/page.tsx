import { PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72 py-10">
      <div className="flex flex-row items-center justify-between  py-8 gap-8 ">
        <Link
          href={"/texts"}
          className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <h2
          className={`${PoppinsSemi.className} text-gray-100 text-xl lg:text-3xl capitalize`}
        >
          Guidelines
        </h2>

        <div></div>
      </div>
    </div>
  );
}
