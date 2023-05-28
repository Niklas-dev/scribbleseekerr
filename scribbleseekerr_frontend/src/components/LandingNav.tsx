"use client";
import { useAuth } from "@/providers/auth";
import { PoppinsLight, PoppinsSemi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";

export default function LandingNav() {
  const { user } = useAuth();
  return (
    <nav className="flex flex-row items-center  px-4 sm:px-28 md:px-32 lg:px-36 xl:px-72 pt-8 gap-2 md:gap-8">
      <h3
        className={`${PoppinsSemi.className} text-gray-100 text-xl sm:text-2xl md:text-3xl`}
      >
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
        <div className="flex flex-row gap-2">
          <Link
            className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-2 py-2 md:px-4 md:py-2 transition-transform duration-300 hover:scale-95`}
            href={!user ? "/login" : "/texts"}
          >
            {!user ? "Login" : "Continue"}
          </Link>
          {user && (
            <button
              onClick={() => {
                localStorage.setItem("access_token", "");
                localStorage.setItem("refresh_token", "");

                window.location.reload();
              }}
              className={`${PoppinsSemi.className} text-[#0e0e0e] text-lg bg-gray-100 rounded-md px-2 py-2 md:px-4 md:py-2 transition-transform duration-300 hover:scale-95`}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
