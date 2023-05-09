import { PoppinsLight, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function LandingNav() {
  return (
    <nav className="flex flex-row px-72 pt-8 gap-8">
      <h3 className={`${PoppinsSemi.className} text-gray-100 text-3xl`}>
        ScribbleSeeker
      </h3>
      <div className="flex flex-row justify-between items-center w-full ">
        <div className="flex flex-row gap-4">
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/poems"}
          >
            Poems
          </Link>
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/stories"}
          >
            Stories
          </Link>
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/papers"}
          >
            Papers
          </Link>
        </div>
        <div>
          <Link
            className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-2`}
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
