"use client";
import { useAuth } from "@/providers/auth";
import { PoppinsLight, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function LandingNav() {
  const { user } = useAuth();
  return (
    <nav className="flex flex-row  px-4 sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-8">
      <h3 className={`${PoppinsSemi.className} text-gray-100 text-3xl`}>
        ScribbleSeekerr
      </h3>
      <div className="flex flex-row justify-end lg:justify-between items-center w-full ">
        <div className="flex-row gap-4 hidden lg:flex">
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/texts?text_type=poem"}
          >
            Poems
          </Link>
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/texts?text_type=story"}
          >
            Stories
          </Link>
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/texts?text_type=paper"}
          >
            Papers
          </Link>
          <Link
            className={`${PoppinsLight.className} text-gray-200 text-lg`}
            href={"/texts?text_type=all"}
          >
            Any
          </Link>
        </div>
        <div>
          <Link
            className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-4 py-2 transition-transform duration-300 hover:scale-95`}
            href={!user ? "/login" : "/texts"}
          >
            {!user ? "Login" : "Continue"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
