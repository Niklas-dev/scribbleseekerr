import ScrollToTop from "@/components/ScrollToTop";
import { PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Page() {
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full ">
      <div className="flex flex-row items-center justify-between px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 grid items-center h-12 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div className="flex flex-row items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute top-4 left-4" color="#F3F4F6" />
            <input
              className={`${PoppinsSemi.className} h-12 w-11/12 md:w-[20rem] lg:w-[30rem] rounded-lg text-lg pl-10 pr-2 py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg`}
              type="text"
            ></input>
          </div>
          <button
            className={`${PoppinsSemi.className} text-[#0e0e0e] text-base whitespace-nowrap lg:text-lg bg-gray-100 rounded-md px-4 py-2 h-12 transition-transform duration-300 hover:scale-95`}
          >
            New Post
          </button>
        </div>
        <div>ze</div>
      </div>
      <div className="px-20 lg:px-80 pt-20"></div>
    </div>
  );
}
