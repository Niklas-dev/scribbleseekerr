import { PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="bg-[#0e0e0e] flex flex-col overflow-y-scroll h-screen w-full px-6  sm:px-28 md:px-32 lg:px-36 xl:px-72">
      <div className="flex flex-row items-center justify-between  pt-8 gap-8">
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
        >
          Back
        </Link>
        <Link
          href={"/"}
          className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
        >
          ScribbleSeekerr
        </Link>

        <div></div>
      </div>
      <div className="pt-10">Test</div>
    </div>
  );
}
