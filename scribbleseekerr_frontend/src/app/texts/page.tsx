import PostWrapperLeft from "@/components/PostWrapperLeft";
import PostWrapperRight from "@/components/PostWrapperRight";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
  PoppinsSemi,
} from "@/styles/fonts";
import Link from "next/link";
import React from "react";

import { FaSearch, FaArrowUp, FaFire } from "react-icons/fa";
// @ts-ignore

export default function page() {
  return (
    <div className="bg-[#0e0e0e] overflow-y-scroll h-screen w-full">
      <div className="absolute bottom-6 right-6 h-14 w-14 bg-gray-100 grid place-content-center rounded-full shadow-xl">
        <FaArrowUp size={20} color="black" />
      </div>
      <div className="flex flex-row items-center justify-between  px-4 sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div className="relative">
          <FaSearch className="absolute top-4 left-4" color="#F3F4F6" />
          <input
            className={`${PoppinsSemi.className} h-12 w-[30rem] rounded-lg text-lg pl-10 pr-2 py-1 outline-none bg-[#1d1d1d] text-gray-100 shadow-lg`}
            type="text"
          ></input>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-100"></div>
      </div>
      <div className="px-80 pt-20">
        <div></div>
        <div className="flex flex-row justify-center gap-2 pb-10">
          <PostWrapperLeft></PostWrapperLeft>
          <PostWrapperRight></PostWrapperRight>
        </div>
      </div>
    </div>
  );
}
