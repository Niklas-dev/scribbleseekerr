import { PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function UserNavBar({}) {
  return (
    <div className="flex flex-row items-center justify-between  pt-8 gap-8">
      <Link
        href={"/texts"}
        className={`${PoppinsSemi.className} text-gray-100 text-lg border-2 border-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
      >
        Back
      </Link>
      <Link
        href={"/"}
        className={`${PoppinsSemi.className} text-gray-100 hidden md:block text-xl lg:text-3xl`}
      >
        Profile
      </Link>

      <div></div>
    </div>
  );
}
